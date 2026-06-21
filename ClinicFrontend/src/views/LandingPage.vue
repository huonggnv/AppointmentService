<template>
  <div class="landing-page">

    <!-- =============================================
         TOP NAVIGATION BAR
         ============================================= -->
    <nav class="landing-navbar">
      <!-- Left: Logo + Menu links -->
      <div class="navbar-left">
        <div class="navbar-brand" @click="goToAuth('login')">
          <v-icon icon="mdi-heart-pulse" color="primary" size="26" class="mr-2" />
          <span class="brand-name text-primary">ClinicFlow</span>
        </div>
        <div class="navbar-links d-none d-md-flex">
          <a class="nav-link active" href="#">Trang chủ</a>
          <a class="nav-link" href="#services">Dịch vụ</a>
          <a class="nav-link" href="#stats">Thống kê</a>
          <a class="nav-link" href="#doctors">Bác sĩ</a>
        </div>
      </div>

      <!-- Right: Auth buttons -->
      <div class="navbar-right">
        <v-btn
          variant="text"
          color="primary"
          class="font-weight-bold mr-2"
          @click="goToAuth('login')"
        >
          Đăng nhập
        </v-btn>
        <v-btn
          color="primary"
          class="font-weight-bold"
          @click="goToAuth('register')"
        >
          Đăng ký ngay
        </v-btn>
      </div>
    </nav>

    <!-- =============================================
         MAIN CONTENT
         ============================================= -->
    <main class="main-content">

      <!-- HERO SECTION -->
      <section class="hero-section">
        <v-container>
          <v-row align="center" class="py-16">
            <!-- Left: Content -->
            <v-col cols="12" md="6" class="hero-text-col">
              <v-chip
                color="secondary"
                class="font-weight-bold mb-6"
                prepend-icon="mdi-shield-check"
              >
                Hệ thống quản lý y tế hàng đầu
              </v-chip>

              <h1 class="hero-title text-primary">
                Chăm sóc sức khỏe <br />
                <span class="text-secondary">thông minh</span> với ClinicFlow
              </h1>

              <p class="hero-desc text-grey-darken-1">
                Nền tảng quản lý phòng khám hiện đại giúp tối ưu hóa quy trình khám
                chữa bệnh, mang lại trải nghiệm tốt nhất cho cả bác sĩ và bệnh nhân.
                Đặt lịch nhanh chóng, quản lý thông minh.
              </p>

              <div class="hero-actions">
                <v-btn
                  size="large"
                  color="primary"
                  class="font-weight-bold hero-cta mr-4"
                  prepend-icon="mdi-calendar-plus"
                  @click="goToAuth('login')"
                >
                  Đặt lịch khám ngay
                </v-btn>
                <v-btn
                  size="large"
                  variant="outlined"
                  color="primary"
                  class="font-weight-bold"
                  href="#services"
                >
                  Tìm hiểu thêm
                </v-btn>
              </div>
            </v-col>

            <!-- Right: Image -->
            <v-col cols="12" md="6">
              <div class="hero-image-wrapper">
                <v-img
                  class="w-full rounded-xl"
                  height="400"
                  cover
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVwqkJfQ_E8nZmgTRR2nUfcAFyOGmWAvtLoeYAf9LkzXzPzn33tqK80m9NjAxhpStTu9IYbqwP6AediDbii-nUQHLWX0XpAZZnakbkO29kZrlVoG6atv1rO1p2irB3qBJd-t7mKAPccpyVoJ8BypZLcoqR97YUIw5yzuOohXxDhScdo36cfrIpOM0SX36-ErULmHKgHHvISC0HOM5q4QUtlp7mEXY6sfomhG29IXaRP1vjAd5_96a5HkzlGBgNgVnXPudFHhNZSyd0"
                />
                <!-- Floating card overlay -->
                <div class="hero-badge">
                  <v-avatar color="secondary" size="44" class="mr-3">
                    <v-icon icon="mdi-heart-flash" size="24" color="white" />
                  </v-avatar>
                  <div>
                    <div class="font-weight-bold text-body-2">Sẵn sàng phục vụ</div>
                    <div class="text-caption text-grey-darken-1">Hơn 200 bác sĩ chuyên khoa đang trực tuyến</div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- SERVICES SECTION -->
      <section class="section-white" id="services">
        <v-container>
          <div class="section-header text-center mb-12">
            <h2 class="text-h4 font-weight-black text-primary mb-3">Dịch vụ Toàn diện</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 560px;">
              Chúng tôi cung cấp các giải pháp công nghệ tiên tiến để hỗ trợ mọi khía
              cạnh của quản lý y tế.
            </p>
          </div>

          <v-row>
            <v-col cols="12" md="4">
              <v-card border flat class="service-card pa-8 rounded-xl h-100">
                <v-avatar color="primary" variant="tonal" size="56" class="mb-6 service-icon">
                  <v-icon icon="mdi-calendar-check" color="primary" size="32" />
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-3">Đặt lịch Trực tuyến</h3>
                <p class="text-body-2 text-grey-darken-1 mb-6">
                  Bệnh nhân dễ dàng chọn bác sĩ và khung giờ phù hợp ngay trên ứng dụng,
                  giảm thiểu thời gian chờ đợi.
                </p>
                <a class="service-link text-primary font-weight-bold d-flex align-center" @click="goToAuth('login')">
                  Khám phá ngay
                  <v-icon icon="mdi-arrow-right" size="18" class="ml-2" />
                </a>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card border flat class="service-card pa-8 rounded-xl h-100">
                <v-avatar color="secondary" variant="tonal" size="56" class="mb-6 service-icon">
                  <v-icon icon="mdi-clipboard-text-play" color="secondary" size="32" />
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-3">Hồ sơ Bệnh án</h3>
                <p class="text-body-2 text-grey-darken-1 mb-6">
                  Lưu trữ hồ sơ điện tử (EMR) an toàn, bảo mật. Bác sĩ có thể truy cập
                  lịch sử điều trị của bệnh nhân tức thì.
                </p>
                <a class="service-link text-secondary font-weight-bold d-flex align-center" @click="goToAuth('login')">
                  Khám phá ngay
                  <v-icon icon="mdi-arrow-right" size="18" class="ml-2" />
                </a>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card border flat class="service-card pa-8 rounded-xl h-100">
                <v-avatar color="warning" variant="tonal" size="56" class="mb-6 service-icon">
                  <v-icon icon="mdi-pill" color="warning" size="32" />
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-3">Quản lý Nhà thuốc</h3>
                <p class="text-body-2 text-grey-darken-1 mb-6">
                  Quản lý tồn kho thuốc thông minh, kê đơn điện tử chính xác và tự động
                  hóa quy trình thanh toán.
                </p>
                <a class="service-link text-warning font-weight-bold d-flex align-center" @click="goToAuth('login')">
                  Khám phá ngay
                  <v-icon icon="mdi-arrow-right" size="18" class="ml-2" />
                </a>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- STATS SECTION -->
      <section class="stats-section" id="stats">
        <v-container>
          <v-row class="text-center text-white">
            <v-col cols="6" md="3">
              <p class="text-h3 font-weight-black mb-1">500+</p>
              <p class="text-caption font-weight-bold stat-label">Phòng khám</p>
            </v-col>
            <v-col cols="6" md="3">
              <p class="text-h3 font-weight-black mb-1">1.2M+</p>
              <p class="text-caption font-weight-bold stat-label">Lượt khám</p>
            </v-col>
            <v-col cols="6" md="3">
              <p class="text-h3 font-weight-black mb-1">2,000+</p>
              <p class="text-caption font-weight-bold stat-label">Bác sĩ</p>
            </v-col>
            <v-col cols="6" md="3">
              <p class="text-h3 font-weight-black mb-1">98%</p>
              <p class="text-caption font-weight-bold stat-label">Hài lòng</p>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- DOCTORS SECTION -->
      <section class="section-bg" id="doctors">
        <v-container>
          <div class="d-flex justify-space-between align-center flex-wrap mb-12 gap-6">
            <div>
              <h2 class="text-h4 font-weight-black text-primary mb-2">Đội ngũ Bác sĩ Tiêu biểu</h2>
              <p class="text-body-1 text-grey-darken-1 mb-0" style="max-width: 480px;">
                Đội ngũ chuyên gia y tế giàu kinh nghiệm, tận tâm vì sức khỏe cộng đồng.
              </p>
            </div>
            <v-btn
              variant="outlined"
              color="primary"
              class="font-weight-bold"
              size="large"
              @click="goToAuth('login')"
            >
              Xem tất cả bác sĩ
            </v-btn>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-card border flat class="doctor-card overflow-hidden rounded-xl h-100">
                <v-img cover height="280" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC24E-nLI9uPt1LeRLQOoU5rssjsKB1tE_qJICztXVWvOyRDSb-HdS5-hr4_jKhzfcxrxKA_oXNWnSN6qs3i7a5Utyy_YtFsHXNiz84unIUNhIlg3rXFQhgai26z0kUGiqDw6PkemUX_nQG3dC0A5-gJjG0sCnPaKItPaMEB5lz-2sdtzu7MHoNl0gu11ZzAkoT5mQx5WnYX3WepxIAz4ivlwiImYl6PFEL4PSpCfNBZAgWFt-mD2JbNTlV9NxwyKr93G6vOzZlmn3O" />
                <div class="pa-4 bg-white">
                  <h4 class="font-weight-bold text-subtitle-1 mb-1">BS. Nguyễn Văn An</h4>
                  <p class="text-caption text-grey-darken-1 mb-0">Khoa Nội tổng quát</p>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card border flat class="doctor-card overflow-hidden rounded-xl h-100">
                <v-img cover height="280" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4MgdGYpNjNLyFJHa3Rgov39Rqjdvw1It5-uUtcMk1tQ_MhPB8ere1R2Pr5WnmnCxFaTfHB1-39GEkrCBGHd4eLWJoP-_3M8bJ0VrGw8d4c657XzKP8hDw6o6UluBIMnpPy2T80WdEHk7QOHRhh6_Iyds-thpJSgGSS2fROB1XEobnr8IYQNQ1c7j8Hmx8HgLcm5XEl0OCQ72NSvXsCHSmXEUfdZ_nKbonbBzhaW2s74N2Cg1NgeFA6V2RwCQa7oO-0_-eYcTLWW2" />
                <div class="pa-4 bg-white">
                  <h4 class="font-weight-bold text-subtitle-1 mb-1">BS. Trần Thị Bình</h4>
                  <p class="text-caption text-grey-darken-1 mb-0">Khoa Nhi khoa</p>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card border flat class="doctor-card overflow-hidden rounded-xl h-100">
                <v-img cover height="280" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHpw2sjC3D4ziEey2UPeQACgfJmkuXyn-Q56pB308kzkpS0uDFO1Vl9_bFMbDpun-GQx9dEIaJQBOtKkzX_Bso0aOMBqm3ccBhDuj5LaHt8SXkAHn_44evZISCMKR5ODN2fe8mH232eclYw-0bIOfw_4gY9njZ832rBPXca6c77Szjbm_6EJhdRvn_ESCH-amsO8U_-r_ejbnO0a_k9Ok3GiGuoUVKB_Ib7hj6x13t4EReNchkyHrOfOkMMXHFeHhyFttcZXW8-7WG" />
                <div class="pa-4 bg-white">
                  <h4 class="font-weight-bold text-subtitle-1 mb-1">BS. Lê Hoàng Nam</h4>
                  <p class="text-caption text-grey-darken-1 mb-0">Khoa Da liễu</p>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card border flat class="doctor-card overflow-hidden rounded-xl h-100">
                <v-img cover height="280" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqVg9isiGdQ0fNFLBsGPLpYcBKhN64iQ96g2VGXM_1A8LDVYjFrrQnodPi6UDfdU43OcQB-SOO_SEYwxDUoW21EiydAXIXb7lmQQIifMUEdoCG13FRdpnS9rFnHGFTRDEni0X0eTz333sTllmkwLf5enwvwMcttkcWYxYYdfTnnZYdlLmZl9h8OUWFoJA1NkIEoUwSQpFxy53SwfeO9Dtj6ltybg5aO7XwWGDJosAQdzuvt8pK3gI2eo4v8g3hxzMQ2WK-1dzCrfDT" />
                <div class="pa-4 bg-white">
                  <h4 class="font-weight-bold text-subtitle-1 mb-1">BS. Phạm Minh Đức</h4>
                  <p class="text-caption text-grey-darken-1 mb-0">Khoa Ngoại khoa</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="landing-footer">
      <v-container class="text-center">
        <p class="font-weight-bold text-primary mb-1">
          © 2026 ClinicFlow - Hệ thống quản lý y khoa liên thông thông minh
        </p>
        <p class="text-caption text-grey-darken-1 mb-0">
          Được xây dựng trên nền tảng kiến trúc Microservices và Vuetify 3.
        </p>
      </v-container>
    </footer>

  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'LandingPage',
  setup() {
    const router = useRouter()

    const goToAuth = (mode) => {
      router.push({ name: 'Auth', query: { mode } })
    }

    return {
      goToAuth
    }
  }
}
</script>

<style scoped>
/* ======= NAVBAR ======= */
.landing-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #DFE1E6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 1px 4px rgba(0, 61, 155, 0.06);
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

.brand-name {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #003D9B;
  border-bottom-color: #003D9B;
}

.navbar-right {
  display: flex;
  align-items: center;
}

/* ======= MAIN CONTENT ======= */
.main-content {
  padding-top: 64px;
}

/* ======= HERO ======= */
.hero-section {
  background: radial-gradient(circle at top right, rgba(0, 61, 155, 0.05), transparent 45%),
              radial-gradient(circle at bottom left, rgba(0, 108, 71, 0.05), transparent 45%);
  background-color: #F4F5F7;
  min-height: 600px;
  display: flex;
  align-items: center;
}

.hero-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 20px;
}

.hero-desc {
  font-size: 16px;
  line-height: 1.7;
  max-width: 500px;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.hero-cta {
  box-shadow: 0 4px 20px rgba(0, 61, 155, 0.25) !important;
}

.hero-image-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #DFE1E6;
  box-shadow: 0 20px 48px rgba(0, 61, 155, 0.1);
}

.hero-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(223, 225, 230, 0.6);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 61, 155, 0.06);
}

/* ======= SECTIONS ======= */
.section-white {
  background-color: #ffffff;
  padding: 80px 0;
}

.section-bg {
  background-color: #F4F5F7;
  padding: 80px 0;
}

/* ======= SERVICE CARDS ======= */
.service-card {
  border-color: #DFE1E6 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.service-card:hover {
  border-color: #003D9B !important;
  box-shadow: 0 12px 24px rgba(0, 61, 155, 0.08) !important;
  transform: translateY(-4px);
}

.service-icon {
  border-radius: 12px !important;
}

.service-link {
  text-decoration: none;
  cursor: pointer;
  transition: gap 0.2s ease;
}

.service-link:hover {
  opacity: 0.8;
}

/* ======= STATS ======= */
.stats-section {
  background-color: #003D9B;
  padding: 64px 0;
}

.stat-label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

/* ======= DOCTOR CARDS ======= */
.doctor-card {
  border-color: #DFE1E6 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.doctor-card:hover {
  border-color: #006C47 !important;
  box-shadow: 0 12px 24px rgba(0, 108, 71, 0.08) !important;
  transform: translateY(-4px);
}

/* ======= FOOTER ======= */
.landing-footer {
  background-color: #ffffff;
  border-top: 1px solid #DFE1E6;
  padding: 48px 0;
}

.gap-6 {
  gap: 24px;
}
</style>
