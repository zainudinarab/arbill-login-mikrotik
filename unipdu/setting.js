/**
 * ====================================================================
 * UNIVERSITAS PESANTREN TINGGI DARUL 'ULUM (UNIPDU) JOMBANG
 * KONFIGURASI LOGIN HOTSPOT & WEB API SERVICE (ENCRYPTED API KEY)
 * ====================================================================
 * Seluruh akses ke server backend diamankan menggunakan kunci enkripsi
 * resmi 256-bit (HOTSPOT_API_KEY).
 */

window.UNIPDU_CONFIG = {
  // 1. URL SERVER WEB API HOTSPOT UNIPDU (Produksi Full Golang System)
  // Arahkan ke domain resmi portal hotspot UNIPDU
  API_BASE_URL: 'https://unipdu.arabpay.my.id',

  // 2. KUNCI RAHASIA RESMI (ENCRYPTED API KEY 256-BIT)
  API_KEY: 'unipdu_sec_20cd9cfb4176d6a1328ffecc976697d3122b08401a0b0355efea7002f3f887ac',

  // 3. ENDPOINT RESMI WEB API
  GUEST_REGISTER_ENDPOINT: '/api/guest/register',
  GUEST_CHECK_ACTIVE_ENDPOINT: '/api/guest/check-active',
  CHANGE_PASSWORD_ENDPOINT: '/api/users/change-password',
  VERIFY_LOGIN_ENDPOINT: '/api/auth/verify-login',

  // 4. STATUS FORM TAMU DI PREVIEW BROWSER LOKAL (true = tampilkan form)
  TRIAL_ACTIVE: true,

  // 5. IDENTITAS & BRAND KAMPUS
  CAMPUS_NAME: "UNIPDU JOMBANG",
  CAMPUS_FULLNAME: "Universitas Pesantren Tinggi Darul 'Ulum",

  // 6. DEFAULT ID ROUTER (Fallback jika tidak terdeteksi dari MikroTik $(identity))
  DEFAULT_ROUTER_ID: 'all',

  // 7. MODE SIMULASI / CADANGAN JIKA SERVER WEB OFFLINE
  ENABLE_MOCK_FALLBACK: true
};

// Client Web API Helper untuk Captive Portal
window.UNIPDU_API = {
  getBaseUrl: function() {
    return (window.UNIPDU_CONFIG && window.UNIPDU_CONFIG.API_BASE_URL)
      ? window.UNIPDU_CONFIG.API_BASE_URL.replace(/\/$/, '')
      : '';
  },

  getApiKey: function() {
    return (window.UNIPDU_CONFIG && window.UNIPDU_CONFIG.API_KEY)
      ? window.UNIPDU_CONFIG.API_KEY
      : '';
  },

  // 1. Cek Tamu Aktif berdasarkan MAC Address
  checkActiveGuest: async function(mac) {
    if (!mac || mac.indexOf('$') !== -1) return null;
    try {
      var url = this.getBaseUrl() + (window.UNIPDU_CONFIG.GUEST_CHECK_ACTIVE_ENDPOINT || '/api/guest/check-active');
      var res = await fetch(url + '?mac=' + encodeURIComponent(mac.trim()) + '&api_key=' + encodeURIComponent(this.getApiKey()));
      if (!res.ok) return null;
      var data = await res.json();
      if (data.success && data.has_active && data.data) {
        return {
          id: data.data.id || '',
          name: data.data.name || 'Tamu',
          guest_code: data.data.guest_code || '',
          purpose: data.data.purpose || '',
          username: data.data.username || '',
          password: data.data.password || data.data.username || '',
          profile: data.data.profile || '',
          created_at: data.data.created_at || '',
          remaining_str: data.data.remaining_str || 'Akun tamu aktif',
          remaining_ms: data.data.remaining_ms || 0,
          expired_at: data.data.expired_at || ''
        };
      }
    } catch (e) {
      console.warn("UNIPDU_API checkActiveGuest error:", e.message);
    }
    return null;
  },

  // 2. Pendaftaran Tamu Baru via Web API
  registerGuest: async function(formData) {
    var url = this.getBaseUrl() + (window.UNIPDU_CONFIG.GUEST_REGISTER_ENDPOINT || '/api/guest/register');
    var defaultRouter = (window.UNIPDU_CONFIG && window.UNIPDU_CONFIG.DEFAULT_ROUTER_ID) ? window.UNIPDU_CONFIG.DEFAULT_ROUTER_ID : 'all';
    
    var routerId = defaultRouter;
    if (formData.router_id && formData.router_id.indexOf('$') === -1 && formData.router_id.trim() !== '') {
      routerId = formData.router_id.trim();
    } else if (formData.identity && formData.identity.indexOf('$') === -1 && formData.identity.trim() !== '') {
      routerId = formData.identity.trim();
    }

    var mac = (formData.mac && formData.mac.indexOf('$') === -1) ? formData.mac.trim() : '';
    var ip = (formData.ip && formData.ip.indexOf('$') === -1) ? formData.ip.trim() : '';

    var payload = {
      name: formData.name,
      phone: formData.phone,
      purpose: formData.purpose,
      mac: mac,
      ip: ip,
      identity: routerId,
      router_id: routerId
    };

    var res = await fetch(url + '?api_key=' + encodeURIComponent(this.getApiKey()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    var data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Gagal mendaftar ke server Web API.');
    }

    return {
      success: true,
      username: data.username,
      password: data.password || data.username,
      guest_code: data.guest_code || data.username,
      mac: (data.data && data.data.mac) ? data.data.mac : (payload.mac || '')
    };
  },

  // 3. Ganti Password Pengguna Kampus via Web API
  changePassword: async function(username, oldPw, newPw, routerId) {
    var url = this.getBaseUrl() + (window.UNIPDU_CONFIG.CHANGE_PASSWORD_ENDPOINT || '/api/users/change-password');
    var res = await fetch(url + '?api_key=' + encodeURIComponent(this.getApiKey()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        old_password: oldPw,
        new_password: newPw,
        confirm_password: newPw,
        router_id: routerId || 'all',
        identity: routerId || 'all'
      })
    });

    var data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Gagal mengganti password.');
    }

    return data;
  },

  // 4. Request Kode OTP Reset Password Mandiri
  requestResetOtp: async function(username, email) {
    var url = this.getBaseUrl() + '/api/auth/reset-password/request-otp';
    var res = await fetch(url + '?api_key=' + encodeURIComponent(this.getApiKey()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email
      })
    });

    var data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Gagal meminta kode OTP.');
    }
    return data;
  },

  // 5. Verifikasi OTP dan Setel Password Baru / Default SIAKAD
  verifyResetOtp: async function(payload) {
    var url = this.getBaseUrl() + '/api/auth/reset-password/verify';
    var res = await fetch(url + '?api_key=' + encodeURIComponent(this.getApiKey()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    var data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Gagal memverifikasi OTP.');
    }
    return data;
  },

  // 6. Reset Instan ke Default SIAKAD dengan Verifikasi Email Institusi
  resetPasswordInstant: async function(username, email) {
    var url = this.getBaseUrl() + '/api/auth/reset-password/instant';
    var res = await fetch(url + '?api_key=' + encodeURIComponent(this.getApiKey()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email
      })
    });

    var data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Gagal me-reset password ke default SIAKAD.');
    }
    return data;
  },

  // 7. Verifikasi Kredensial Login (Mode Simulasi / Preview Browser)
  verifyLogin: async function(username, password) {
    var url = this.getBaseUrl() + (window.UNIPDU_CONFIG.VERIFY_LOGIN_ENDPOINT || '/api/auth/verify-login');
    var res = await fetch(url + '?api_key=' + encodeURIComponent(this.getApiKey()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    var data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Verifikasi login gagal.');
    }
    return data;
  }
};
