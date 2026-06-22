<template>
  <div class="landing-page">

    <!-- Thanh điều hướng (Navbar) -->
    <nav class="public-nav">
      <div class="nav-container">
        <div class="nav-logo" @click="goToAuth('login')" style="cursor: pointer;">
          <i class="fa-solid fa-heart-pulse mr-2" style="font-size: 24px; color: var(--primary-color);"></i>
          <span style="font-weight: 700; font-size: 18px; color: var(--text-primary);">ClinicFlow</span>
        </div>
        <div class="nav-links d-none d-md-flex">
          <a href="#">Trang chủ</a>
          <a href="#services">Dịch vụ</a>
          <a href="#stats">Thống kê</a>
          <a href="#doctors">Bác sĩ</a>
        </div>
        <div class="nav-auth">
          <a class="btn btn-login" @click="goToAuth('login')">Đăng nhập</a>
          <a class="btn btn-register" @click="goToAuth('register')">Đăng ký</a>
        </div>
      </div>
    </nav>

    <!-- Banner chính (Hero) -->
    <section class="hero-section">
      <div class="hero-content" style="max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: 42px; font-weight: 700; margin-bottom: 20px; line-height: 1.2;">
          Giải Pháp Quản Lý Y Tế Liên Thông Đột Phá
        </h1>
        <p style="font-size: 16px; margin-bottom: 32px; opacity: 0.9; line-height: 1.6;">
          Hệ thống kết nối liên thông các dịch vụ Đặt lịch, Hồ sơ bệnh án điện tử và Quản lý kho thuốc, viện phí.
          Tối ưu hóa thời gian chờ và chuyên nghiệp hóa quy trình chăm sóc sức khỏe.
        </p>
        <a class="btn btn-register btn-large" @click="goToAuth('login')">
          <i class="fa-solid fa-calendar-check mr-2"></i>Đặt lịch khám ngay
        </a>
      </div>
    </section>

    <!-- Nội dung chính (Dịch vụ) -->
    <main class="public-main" id="services">
      <div class="info-section">
        <h2>Dịch vụ y khoa liên thông toàn diện</h2>
        <div class="info-grid">
          
          <div class="info-card">
            <i class="fa-solid fa-calendar-days" style="font-size: 32px; color: var(--primary-color); margin-bottom: 16px;"></i>
            <h3>Đặt lịch khám bệnh</h3>
            <p>
              Bệnh nhân chủ động chọn bác sĩ, chuyên khoa và khung giờ khám mong muốn,
              tránh tình trạng quá tải hoặc trùng giờ.
            </p>
          </div>

          <div class="info-card">
            <i class="fa-solid fa-file-medical" style="font-size: 32px; color: var(--primary-color); margin-bottom: 16px;"></i>
            <h3>Hồ sơ bệnh án điện tử</h3>
            <p>
              Lưu trữ bệnh án điện tử an toàn, giúp bác sĩ dễ dàng truy vấn lịch sử khám
              và hỗ trợ phác đồ điều trị tốt hơn.
            </p>
          </div>

          <div class="info-card">
            <i class="fa-solid fa-prescription-bottle-medical" style="font-size: 32px; color: var(--primary-color); margin-bottom: 16px;"></i>
            <h3>Đơn thuốc &amp; Viện phí</h3>
            <p>
              Tự động hóa tính toán chi phí, xuất hóa đơn viện phí tức thì sau khám và liên
              thông kho dược phẩm chặt chẽ.
            </p>
          </div>

        </div>
      </div>
    </main>

    <!-- Thống kê -->
    <section id="stats" style="background-color: var(--primary-color); padding: 60px 0; color: #ffffff;">
      <v-container>
        <v-row class="text-center">
          <v-col cols="6" md="3">
            <h3 style="font-size: 36px; font-weight: 700; margin-bottom: 4px;">500+</h3>
            <p style="font-size: 13px; text-transform: uppercase; opacity: 0.8; font-weight: 500;">Bệnh nhân mỗi ngày</p>
          </v-col>
          <v-col cols="6" md="3">
            <h3 style="font-size: 36px; font-weight: 700; margin-bottom: 4px;">100%</h3>
            <p style="font-size: 13px; text-transform: uppercase; opacity: 0.8; font-weight: 500;">Liên thông dữ liệu</p>
          </v-col>
          <v-col cols="6" md="3">
            <h3 style="font-size: 36px; font-weight: 700; margin-bottom: 4px;">50+</h3>
            <p style="font-size: 13px; text-transform: uppercase; opacity: 0.8; font-weight: 500;">Y bác sĩ giỏi</p>
          </v-col>
          <v-col cols="6" md="3">
            <h3 style="font-size: 36px; font-weight: 700; margin-bottom: 4px;">99%</h3>
            <p style="font-size: 13px; text-transform: uppercase; opacity: 0.8; font-weight: 500;">Hài lòng phản hồi</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Đội ngũ bác sĩ -->
    <section class="public-main" id="doctors" style="margin-top: 48px; margin-bottom: 48px;">
      <div class="info-section">
        <h2 style="margin-bottom: 32px; text-align: center;">Đội ngũ y bác sĩ ưu tú</h2>
        <div class="info-grid">
          
          <div class="info-card" style="padding: 0; overflow: hidden; border-radius: 12px; border: 1px solid var(--border-color);">
            <v-img cover height="260" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC24E-nLI9uPt1LeRLQOoU5rssjsKB1tE_qJICztXVWvOyRDSb-HdS5-hr4_jKhzfcxrxKA_oXNWnSN6qs3i7a5Utyy_YtFsHXNiz84unIUNhIlg3rXFQhgai26z0kUGiqDw6PkemUX_nQG3dC0A5-gJjG0sCnPaKItPaMEB5lz-2sdtzu7MHoNl0gu11ZzAkoT5mQx5WnYX3WepxIAz4ivlwiImYl6PFEL4PSpCfNBZAgWFt-mD2JbNTlV9NxwyKr93G6vOzZlmn3O" />
            <div class="pa-4 bg-white">
              <h4 style="font-weight: 700; font-size: 15px; margin-bottom: 4px; color: var(--text-primary);">BS. Nguyễn Văn An</h4>
              <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 0;">Khoa Nội tổng quát</p>
            </div>
          </div>

          <div class="info-card" style="padding: 0; overflow: hidden; border-radius: 12px; border: 1px solid var(--border-color);">
            <v-img cover height="260" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4MgdGYpNjNLyFJHa3Rgov39Rqjdvw1It5-uUtcMk1tQ_MhPB8ere1R2Pr5WnmnCxFaTfHB1-39GEkrCBGHd4eLWJoP-_3M8bJ0VrGw8d4c657XzKP8hDw6o6UluBIMnpPy2T80WdEHk7QOHRhh6_Iyds-thpJSgGSS2fROB1XEobnr8IYQNQ1c7j8Hmx8HgLcm5XEl0OCQ72NSvXsCHSmXEUfdZ_nKbonbBzhaW2s74N2Cg1NgeFA6V2RwCQa7oO-0_-eYcTLWW2" />
            <div class="pa-4 bg-white">
              <h4 style="font-weight: 700; font-size: 15px; margin-bottom: 4px; color: var(--text-primary);">BS. Trần Thị Bình</h4>
              <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 0;">Khoa Nhi khoa</p>
            </div>
          </div>

          <div class="info-card" style="padding: 0; overflow: hidden; border-radius: 12px; border: 1px solid var(--border-color);">
            <v-img cover height="260" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHpw2sjC3D4ziEey2UPeQACgfJmkuXyn-Q56pB308kzkpS0uDFO1Vl9_bFMbDpun-GQx9dEIaJQBOtKkzX_Bso0aOMBqm3ccBhDuj5LaHt8SXkAHn_44evZISCMKR5ODN2fe8mH232eclYw-0bIOfw_4gY9njZ832rBPXca6c77Szjbm_6EJhdRvn_ESCH-amsO8U_-r_ejbnO0a_k9Ok3GiGuoUVKB_Ib7hj6x13t4EReNchkyHrOfOkMMXHFeHhyFttcZXW8-7WG" />
            <div class="pa-4 bg-white">
              <h4 style="font-weight: 700; font-size: 15px; margin-bottom: 4px; color: var(--text-primary);">BS. Lê Hoàng Nam</h4>
              <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 0;">Khoa Da liễu</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Chân trang (Footer) -->
    <footer class="public-footer">
      <p style="margin-bottom: 8px; font-weight: 700;">© 2026 ClinicFlow - Giải pháp số y tế liên thông toàn diện</p>
      <p style="font-size: 12px; opacity: 0.8; margin-bottom: 0;">Bản quyền thiết kế đồng bộ theo hệ thống PHP qlsinhvien.</p>
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
/* NAVBAR */
.public-nav {
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
  padding: 16px 32px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px var(--shadow-color);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-auth {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-login {
  background-color: #ffffff;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-login:hover {
  background-color: #f0f6ff;
}

.btn-register {
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: #ffffff;
}

.btn-register:hover {
  background-color: var(--primary-darken);
}

.btn-large {
  font-size: 16px;
  padding: 14px 28px;
  border-radius: 8px;
}

/* HERO */
.hero-section {
  background-color: #002c70;
  color: #ffffff;
  padding: 120px 32px;
  text-align: center;
  background-image: linear-gradient(rgba(10, 37, 80, 0.8), rgba(10, 37, 80, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVwqkJfQ_E8nZmgTRR2nUfcAFyOGmWAvtLoeYAf9LkzXzPzn33tqK80m9NjAxhpStTu9IYbqwP6AediDbii-nUQHLWX0XpAZZnakbkO29kZrlVoG6atv1rO1p2irB3qBJd-t7mKAPccpyVoJ8BypZLcoqR97YUIw5yzuOohXxDhScdo36cfrIpOM0SX36-ErULmHKgHHvISC0HOM5q4QUtlp7mEXY6sfomhG29IXaRP1vjAd5_96a5HkzlGBgNgVnXPudFHhNZSyd0');
  background-size: cover;
  background-position: center;
}

/* MAIN */
.public-main {
  max-width: 1200px;
  margin: 48px auto;
  padding: 0 32px;
}

.info-section h2 {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-primary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.info-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 4px 6px -1px var(--shadow-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.info-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.info-card p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 0;
}

/* FOOTER */
.public-footer {
  background-color: #0a2550;
  color: #ffffff;
  padding: 32px;
  text-align: center;
  font-size: 13px;
  line-height: 1.6;
}
</style>
