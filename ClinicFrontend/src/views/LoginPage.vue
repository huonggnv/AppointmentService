<template>
  <div class="auth-body">

    <!-- Cấu hình API Button góc trên phải màn hình -->
    <div style="position: absolute; top: 16px; right: 16px; z-index: 100;">
      <v-btn
        icon="mdi-cog"
        variant="text"
        color="grey-darken-1"
        @click="configDialog = true"
      />
    </div>

    <!-- Khung Auth Container -->
    <div class="auth-container">
      
      <!-- Logo thương hiệu -->
      <div style="margin-bottom: 24px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;" @click="goHome">
        <i class="fa-solid fa-heart-pulse mr-2" style="font-size: 28px; color: var(--primary-color);"></i>
        <span style="font-size: 24px; font-weight: 700; color: var(--text-primary);">ClinicFlow</span>
      </div>

      <!-- Tiêu đề -->
      <h1>{{ isLoginMode ? 'Đăng Nhập Hệ Thống' : 'Tạo Tài Khoản Mới' }}</h1>
      <p style="color: var(--text-secondary); font-size: 13px; margin-top: -16px; margin-bottom: 24px;">
        {{ isLoginMode ? 'Đăng nhập để vào hệ thống quản lý phòng khám' : 'Đăng ký thông tin bệnh nhân để bắt đầu đặt lịch khám' }}
      </p>

      <!-- Form nhập liệu -->
      <v-form @submit.prevent="handleSubmit">
        
        <!-- Các trường bổ sung khi Đăng ký -->
        <template v-if="!isLoginMode">
          <div class="input-group">
            <label>Họ và tên đầy đủ</label>
            <input
              v-model="authForm.fullName"
              type="text"
              placeholder="Nhập họ và tên đầy đủ..."
              required
            />
          </div>
          <div class="input-group">
            <label>Email</label>
            <input
              v-model="authForm.email"
              type="email"
              placeholder="Nhập email liên hệ..."
              required
            />
          </div>
        </template>

        <!-- Tên đăng nhập -->
        <div class="input-group">
          <label>Tên đăng nhập</label>
          <input
            v-model="authForm.username"
            type="text"
            placeholder="Tên tài khoản..."
            required
          />
        </div>

        <!-- Mật khẩu -->
        <div class="input-group">
          <label>Mật khẩu</label>
          <div style="position: relative; display: flex; align-items: center;">
            <input
              v-model="authForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mật khẩu bảo mật..."
              required
              style="padding-right: 40px;"
            />
            <v-icon
              :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              size="18"
              color="grey-darken-1"
              style="position: absolute; right: 12px; cursor: pointer;"
              @click="showPassword = !showPassword"
            />
          </div>
        </div>

        <!-- Thông báo lỗi (nếu có) -->
        <div v-if="errorMsg" style="color: var(--danger-color); font-weight: 500; font-size: 13px; margin-bottom: 16px; text-align: left; padding: 10px; background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 6px;">
          {{ errorMsg }}
        </div>

        <!-- Nút Submit -->
        <button type="submit" class="auth-button" :disabled="loading">
          <span v-if="!loading">{{ isLoginMode ? 'Đăng Nhập' : 'Đăng Ký' }}</span>
          <span v-else>Vui lòng đợi...</span>
        </button>

      </v-form>

      <!-- Liên kết đổi chế độ -->
      <div class="auth-link">
        <span style="color: var(--text-secondary);">
          {{ isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}
        </span>
        <a style="cursor: pointer; margin-left: 6px;" @click="toggleMode">
          {{ isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập ngay' }}
        </a>
      </div>

      <!-- Quay lại trang chủ -->
      <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
        <a style="cursor: pointer; font-size: 13px; font-weight: 500; color: var(--text-secondary); text-decoration: none;" @click="goHome">
          <i class="fa-solid fa-arrow-left mr-1"></i> Quay lại trang chủ
        </a>
      </div>

    </div>

    <!-- Cấu hình Dialog API liên thông -->
    <v-dialog v-model="configDialog" max-width="500">
      <v-card class="pa-6 rounded-xl">
        <v-card-title class="text-h6 font-weight-bold text-primary px-0 pb-3 d-flex align-center">
          <v-icon icon="mdi-api" color="primary" class="mr-2" />
          Cấu hình địa chỉ API liên thông
        </v-card-title>
        <v-card-text class="px-0 py-3">
          <p class="text-body-2 text-grey-darken-1 mb-4">
            Để liên thông giữa các nhóm, vui lòng điền chính xác địa chỉ API Gateway hoặc API Auth của Nhóm 6.
          </p>
          <v-text-field
            v-model="authApiUrl"
            label="Địa chỉ API Auth (Nhóm 6)"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            hint="Mặc định: http://26.71.15.204:5000/api"
            persistent-hint
          />
          <v-text-field
            v-model="gatewayApiUrl"
            label="Địa chỉ API Gateway (Nhóm mình)"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            hint="Mặc định: http://localhost:5000/api"
            persistent-hint
          />
          <v-text-field
            v-model="medicalApiUrl"
            label="Địa chỉ API Bệnh Án (Nhóm 4)"
            variant="outlined"
            density="comfortable"
            hint="Mặc định: http://26.15.45.202:5000/api"
            persistent-hint
          />
        </v-card-text>
        <v-card-actions class="px-0 pt-3">
          <v-spacer />
          <v-btn variant="text" class="font-weight-bold" color="grey-darken-1" @click="configDialog = false">Hủy bỏ</v-btn>
          <v-btn color="primary" class="font-weight-bold" @click="saveConfig">Lưu cấu hình</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const isLoginMode = ref(true)
    const showPassword = ref(false)
    const loading = ref(false)
    const configDialog = ref(false)
    const errorMsg = ref('')

    const authApiUrl = ref(localStorage.getItem('clinic_auth_api_url') || 'http://26.71.15.204:5000/api')
    const gatewayApiUrl = ref(localStorage.getItem('clinic_api_url') || 'http://localhost:5000/api')
    const medicalApiUrl = ref(localStorage.getItem('clinic_medical_api_url') || 'http://26.15.45.202:5000/api')

    const authForm = ref({
      username: '',
      password: '',
      fullName: '',
      email: ''
    })

    onMounted(() => {
      if (route.query.mode === 'register') {
        isLoginMode.value = false
      }
    })

    const goHome = () => {
      router.push({ name: 'Landing' })
    }

    const toggleMode = () => {
      isLoginMode.value = !isLoginMode.value
      errorMsg.value = ''
    }

    const saveConfig = () => {
      localStorage.setItem('clinic_auth_api_url', authApiUrl.value)
      localStorage.setItem('clinic_api_url', gatewayApiUrl.value)
      localStorage.setItem('clinic_medical_api_url', medicalApiUrl.value)
      configDialog.value = false
    }

    const decodeJwt = (token) => {
      try {
        if (!token) return null
        const parts = token.split('.')
        if (parts.length !== 3) return null
        const payloadBase64 = parts[1]
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          window.atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        return JSON.parse(jsonPayload)
      } catch (e) {
        console.error('Lỗi giải mã JWT token:', e)
        return null
      }
    }

    const handleSubmit = async () => {
      if (isLoginMode.value) {
        await handleLogin()
      } else {
        await handleRegister()
      }
    }

    const handleLogin = async () => {
      try {
        errorMsg.value = ''
        loading.value = true

        const url = `${authApiUrl.value}/Auth/login`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: authForm.value.username,
            password: authForm.value.password
          })
        })

        if (!res.ok) throw new Error('Đăng nhập thất bại. Tài khoản hoặc mật khẩu không chính xác.')
        const data = await res.json()

        localStorage.setItem('clinic_jwt_token', data.token)

        const decoded = decodeJwt(data.token)
        let role = 'Patient'
        let username = authForm.value.username

        if (decoded) {
          role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                || decoded['role']
                || 'Patient'
          username = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
                  || decoded['unique_name']
                  || decoded['sub']
                  || decoded['name']
                  || username
        } else {
          role = data.role || 'Patient'
          username = data.username || username
        }

        localStorage.setItem('clinic_user_role', role)
        localStorage.setItem('clinic_user_name', username)

        router.push({ name: 'Dashboard' })
      } catch (err) {
        errorMsg.value = err.message
      } finally {
        loading.value = false
      }
    }

    const handleRegister = async () => {
      try {
        errorMsg.value = ''
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 800))
        errorMsg.value = ''
        isLoginMode.value = true
        authForm.value.username = ''
        authForm.value.password = ''
      } catch (err) {
        errorMsg.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      isLoginMode,
      showPassword,
      loading,
      configDialog,
      errorMsg,
      authApiUrl,
      gatewayApiUrl,
      medicalApiUrl,
      authForm,
      goHome,
      toggleMode,
      saveConfig,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* style scoped được tích hợp đầy đủ thông qua CSS Variables toàn cục trong style.css */
</style>
