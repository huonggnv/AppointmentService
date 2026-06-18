<template>
  <v-app>
    <!-- App Bar with Premium Theme -->
    <v-app-bar flat border color="surface">
      <v-app-bar-title class="font-weight-bold text-primary">
        <v-icon icon="mdi-heart-pulse" color="primary" class="mr-2" />
        CLINIC BOOKING SYSTEM
      </v-app-bar-title>

      <v-spacer />

      <!-- API Configuration Panel -->
      <v-menu v-model="menuOpen" :close-on-content-click="false" location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" prepend-icon="mdi-cog">
            Cấu hình kết nối
          </v-btn>
        </template>
        <v-card min-width="320" class="pa-4 bg-surface" border>
          <div class="text-subtitle-1 font-weight-bold mb-2">Cài đặt API</div>
          <v-text-field
            v-model="apiUrl"
            label="API URL Base"
            density="compact"
            variant="outlined"
            placeholder="http://localhost:5000/api"
            hide-details
            class="mb-3"
            @keyup.enter="applyConfiguration"
          />
          <v-text-field
            v-model="jwtToken"
            label="JWT Token"
            density="compact"
            variant="outlined"
            hide-details
            class="mb-3"
            @keyup.enter="applyConfiguration"
          />
          <v-btn block color="primary" size="small" class="mb-3 font-weight-bold" @click="applyConfiguration">
            Áp dụng cấu hình
          </v-btn>
          
          <v-divider class="my-2" />
          
          <div class="text-subtitle-2 font-weight-bold mb-1">Đăng nhập nhanh (TestAuth)</div>
          <v-row density="comfortable">
            <v-col cols="4">
              <v-btn block size="small" color="primary" @click="fetchTestToken('Admin')">Admin</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn block size="small" color="secondary" @click="fetchTestToken('Receptionist')">Tiếp Tân</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn block size="small" color="success" @click="fetchTestToken('Doctor')">Bác Sĩ</v-btn>
            </v-col>
          </v-row>
          <div v-if="activeRole" class="text-caption text-success mt-2">
            Đang chạy với vai trò: <strong>{{ activeRole }}</strong>
          </div>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main class="bg-background">
      <v-container fluid class="pa-6">
        <!-- Tab navigation -->
        <v-tabs v-model="activeTab" bg-color="surface" align-tabs="start" rounded="lg" class="mb-6" border>
          <v-tab value="booking" class="font-weight-bold">
            <v-icon icon="mdi-calendar-plus" class="mr-2" />
            Bệnh Nhân Đặt Lịch
          </v-tab>
          <v-tab value="reception" class="font-weight-bold">
            <v-icon icon="mdi-clipboard-text-play" class="mr-2" />
            Quầy Tiếp Tân
          </v-tab>
          <v-tab value="doctor" class="font-weight-bold">
            <v-icon icon="mdi-doctor" class="mr-2" />
            Phòng Khám Bác Sĩ
          </v-tab>
          <v-tab value="tv" class="font-weight-bold">
            <v-icon icon="mdi-television-classic" class="mr-2" color="warning" />
            Màn Hình Tivi Hàng Chờ
          </v-tab>
        </v-tabs>

        <!-- Dynamic Alert Notification -->
        <v-alert
          v-if="alert.show"
          :type="alert.type"
          closable
          class="mb-6"
          variant="tonal"
          @click:close="alert.show = false"
        >
          {{ alert.message }}
        </v-alert>

        <!-- Tabs Content -->
        <v-window v-model="activeTab">
          <!-- 1. PATIENT BOOKING TAB -->
          <v-window-item value="booking">
            <v-row>
              <!-- Doctor & Schedule Selection -->
              <v-col cols="12" md="7">
                <v-card border flat class="bg-surface pa-6 mb-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon icon="mdi-doctor" color="primary" class="mr-2" />
                    <h2 class="text-h6 font-weight-bold">Bước 1: Chọn bác sĩ & ca khám</h2>
                  </div>

                  <!-- Specialty filter -->
                  <v-select
                    v-model="selectedSpecialty"
                    :items="specialties"
                    label="Lọc theo Chuyên Khoa"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-4"
                    @update:model-value="onFilterChange"
                  />

                  <!-- Doctors List -->
                  <div class="text-subtitle-2 font-weight-bold mb-2">Danh sách Bác sĩ</div>
                  <v-row>
                    <v-col v-for="doc in filteredDoctors" :key="doc.id" cols="12" sm="6">
                      <v-card
                        border
                        flat
                        :color="bookingForm.doctorId === doc.id ? 'primary-darken-1' : 'surface'"
                        class="pa-4 cursor-pointer hover-card"
                        :style="bookingForm.doctorId === doc.id ? 'border: 2px solid #38BDF8 !important' : ''"
                        @click="selectDoctor(doc)"
                      >
                        <div class="d-flex justify-between align-center mb-1">
                          <span class="font-weight-bold text-subtitle-1">{{ doc.fullName }}</span>
                          <v-chip size="x-small" color="primary" variant="flat">{{ doc.specialty }}</v-chip>
                        </div>
                        <div class="text-caption text-grey-lighten-1 mb-2">{{ doc.qualifications }}</div>
                        <div class="d-flex justify-space-between align-center">
                          <span class="text-caption text-grey">Phí khám:</span>
                          <span class="font-weight-bold text-success">{{ formatMoney(doc.consultationFee) }}đ</span>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-divider class="my-6" />

                  <!-- Available Schedules -->
                  <div class="d-flex align-center mb-3">
                    <v-icon icon="mdi-clock-outline" color="secondary" class="mr-2" />
                    <div class="text-subtitle-1 font-weight-bold">Ca khám trống khả dụng</div>
                  </div>

                  <v-alert v-if="!bookingForm.doctorId" type="info" variant="text" density="comfortable">
                    Vui lòng chọn một bác sĩ ở danh sách trên để xem ca khám trống.
                  </v-alert>
                  <v-alert v-else-if="availableSchedules.length === 0" type="warning" variant="text" density="comfortable">
                    Bác sĩ này hiện tại không có ca làm việc nào còn trống trong 7 ngày tới.
                  </v-alert>

                  <v-row v-else>
                    <v-col v-for="sch in availableSchedules" :key="sch.id" cols="12" sm="6">
                      <v-card
                        border
                        flat
                        :color="bookingForm.scheduleId === sch.id ? 'secondary-darken-1' : 'surface'"
                        class="pa-3 cursor-pointer hover-card"
                        :style="bookingForm.scheduleId === sch.id ? 'border: 2px solid #818CF8 !important' : ''"
                        @click="selectSchedule(sch)"
                      >
                        <div class="d-flex justify-space-between align-center mb-1">
                          <span class="font-weight-bold">{{ formatDate(sch.date) }}</span>
                          <v-chip size="x-small" :color="sch.shift === 'Sang' ? 'warning' : 'info'">Ca {{ sch.shift }}</v-chip>
                        </div>
                        <div class="text-caption mb-1">
                          Thời gian: <strong>{{ formatTimeSpan(sch.startTime) }} - {{ formatTimeSpan(sch.endTime) }}</strong>
                        </div>
                        <div class="d-flex justify-space-between align-center">
                          <span class="text-caption">Đã đặt:</span>
                          <v-chip size="x-small" variant="outlined" color="success">
                            {{ sch.currentBookings }} / {{ sch.maxPatients }}
                          </v-chip>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <!-- Patient Information & Submit -->
              <v-col cols="12" md="5">
                <v-card border flat class="bg-surface pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon icon="mdi-account-details" color="success" class="mr-2" />
                    <h2 class="text-h6 font-weight-bold">Bước 2: Thông tin bệnh nhân</h2>
                  </div>

                  <v-form @submit.prevent="bookAppointment">
                    <v-text-field
                      v-model="bookingForm.patientName"
                      label="Họ và tên Bệnh nhân"
                      variant="outlined"
                      class="mb-3"
                      required
                    />
                    <v-text-field
                      v-model="bookingForm.patientPhone"
                      label="Số điện thoại liên hệ"
                      variant="outlined"
                      class="mb-3"
                      required
                    />
                    <v-text-field
                      v-model="bookingForm.patientEmail"
                      label="Email liên hệ"
                      variant="outlined"
                      class="mb-3"
                    />
                    
                    <!-- Choose specific time slot inside shift hours -->
                    <v-text-field
                      v-model="bookingForm.timeSlot"
                      label="Khung giờ muốn khám (Giờ cụ thể, vd: 08:30:00)"
                      variant="outlined"
                      placeholder="hh:mm:ss"
                      class="mb-3"
                      required
                    />

                    <v-textarea
                      v-model="bookingForm.notes"
                      label="Triệu chứng lâm sàng / Ghi chú"
                      variant="outlined"
                      rows="3"
                      class="mb-4"
                    />

                    <v-btn
                      type="submit"
                      color="primary"
                      block
                      size="large"
                      class="font-weight-bold"
                      :disabled="!bookingForm.doctorId || !bookingForm.scheduleId || loading"
                      :loading="loading"
                    >
                      Đăng Ký Đặt Lịch Khám
                    </v-btn>
                  </v-form>
                </v-card>

                <!-- Ticket details showing after booking success -->
                <v-card v-if="recentTicket" border flat class="bg-surface pa-6 mt-6 border-success">
                  <div class="d-flex align-center justify-space-between mb-3">
                    <span class="text-success font-weight-bold d-flex align-center">
                      <v-icon icon="mdi-check-circle" class="mr-1" />
                      Đặt lịch thành công!
                    </span>
                    <v-chip color="success" size="small">{{ recentTicket.status }}</v-chip>
                  </div>
                  <div class="text-center bg-slate-900 pa-4 rounded-lg border border-dashed mb-4">
                    <div class="text-caption text-grey">MÃ LỊCH HẸN</div>
                    <div class="text-h4 font-weight-black text-primary">{{ recentTicket.appointmentCode }}</div>
                  </div>
                  <div class="text-subtitle-2 mb-1">Bác sĩ: <strong>{{ recentTicket.doctorName }}</strong></div>
                  <div class="text-subtitle-2 mb-1">Bệnh nhân: <strong>{{ recentTicket.patientName }}</strong></div>
                  <div class="text-subtitle-2 mb-1">Ngày hẹn: <strong>{{ formatDate(recentTicket.appointmentDate) }}</strong></div>
                  <div class="text-subtitle-2 mb-1">Giờ khám: <strong>{{ recentTicket.timeSlot }}</strong></div>
                  <div class="text-caption text-warning mt-2">
                    Lưu ý: Bệnh nhân mang mã lịch hẹn này đến quầy tiếp tân vào ngày khám để xác nhận và lấy số thứ tự.
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- 2. RECEPTIONIST BOARD TAB -->
          <v-window-item value="reception">
            <v-row>
              <!-- Search & Pending Bookings list -->
              <v-col cols="12" md="8">
                <v-card border flat class="bg-surface pa-6 mb-6">
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-calendar-clock" color="primary" class="mr-2" />
                      <h2 class="text-h6 font-weight-bold">Danh sách Lịch hẹn Chờ Xác Nhận</h2>
                    </div>
                    <v-btn size="small" variant="outlined" prepend-icon="mdi-refresh" @click="fetchPendingAppointments" :loading="loading">
                      Làm mới
                    </v-btn>
                  </div>

                  <!-- Quick search by SĐT or Mã -->
                  <v-row density="comfortable" class="mb-4">
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="searchQuery.code"
                        label="Tra cứu Mã lịch hẹn"
                        density="compact"
                        variant="outlined"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="searchQuery.phone"
                        label="Tra cứu Số điện thoại"
                        density="compact"
                        variant="outlined"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-btn block color="primary" height="40" @click="searchAppointments">
                        Tìm kiếm
                      </v-btn>
                    </v-col>
                  </v-row>

                  <!-- Search results if searching -->
                  <div v-if="searchResults !== null" class="mb-4">
                    <div class="d-flex align-center justify-space-between mb-2">
                      <span class="text-subtitle-2 text-primary">Kết quả tra cứu ({{ searchResults.length }})</span>
                      <v-btn size="x-small" variant="text" @click="clearSearch">Quay lại danh sách chờ</v-btn>
                    </div>
                    
                    <v-alert v-if="searchResults.length === 0" type="info" variant="tonal">
                      Không tìm thấy cuộc hẹn nào phù hợp.
                    </v-alert>

                    <v-row v-else density="comfortable">
                      <v-col v-for="app in searchResults" :key="app.id" cols="12">
                        <v-card border flat class="pa-4 bg-slate-900 d-flex justify-space-between align-center">
                          <div>
                            <div class="d-flex align-center gap-2 mb-1">
                              <span class="font-weight-bold text-subtitle-1">{{ app.patientName }}</span>
                              <v-chip size="x-small" color="primary">{{ app.appointmentCode }}</v-chip>
                              <v-chip size="x-small" :color="getStatusColor(app.status)">{{ app.status }}</v-chip>
                            </div>
                            <div class="text-caption text-grey">
                              Bác sĩ: <strong>{{ app.doctorName }}</strong> | Khung giờ: {{ app.timeSlot }} | Ngày: {{ formatDate(app.appointmentDate) }}
                            </div>
                          </div>
                          <div class="d-flex gap-2">
                            <v-btn
                              v-if="app.status === 'ChoXacNhan'"
                              color="success"
                              size="small"
                              @click="confirmAppointment(app.id)"
                            >
                              Xác Nhận & Xếp Lớp
                            </v-btn>
                            <v-btn
                              v-if="app.status !== 'DaHuy' && app.status !== 'DaKham'"
                              color="error"
                              variant="outlined"
                              size="small"
                              @click="cancelAppointment(app.id)"
                            >
                              Hủy Lịch
                            </v-btn>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Default list of pending appointments -->
                  <div v-else>
                    <v-alert v-if="pendingAppointments.length === 0" type="info" variant="text">
                      Hiện tại không có lịch hẹn nào đang ở trạng thái chờ xác nhận.
                    </v-alert>

                    <v-row v-else density="comfortable">
                      <v-col v-for="app in pendingAppointments" :key="app.id" cols="12">
                        <v-card border flat class="pa-4 d-flex justify-space-between align-center">
                          <div>
                            <div class="d-flex align-center gap-2 mb-1">
                              <span class="font-weight-bold text-subtitle-1">{{ app.patientName }}</span>
                              <v-chip size="x-small" color="primary">{{ app.appointmentCode }}</v-chip>
                            </div>
                            <div class="text-caption text-grey">
                              SĐT: {{ app.patientPhone }} | Bác sĩ: <strong>{{ app.doctorName }}</strong> | Khung giờ: <strong>{{ app.timeSlot }}</strong> | Triệu chứng: {{ app.notes || 'Không ghi chú' }}
                            </div>
                          </div>
                          <div class="d-flex gap-2">
                            <v-btn
                              color="success"
                              size="small"
                              @click="confirmAppointment(app.id)"
                            >
                              Xác Nhận
                            </v-btn>
                            <v-btn
                              color="error"
                              variant="outlined"
                              size="small"
                              @click="cancelAppointment(app.id)"
                            >
                              Hủy
                            </v-btn>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </v-col>

              <!-- Reception Info Card -->
              <v-col cols="12" md="4">
                <v-card border flat class="bg-surface pa-6">
                  <h3 class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center">
                    <v-icon icon="mdi-printer" class="mr-2" color="primary" />
                    Phiếu Tiếp Nhận Gần Nhất
                  </h3>
                  <v-alert v-if="!lastConfirmedApp" type="info" variant="tonal" density="compact">
                    Chưa có phiếu khám nào được tiếp nhận trong phiên làm việc này.
                  </v-alert>
                  <v-card v-else border class="pa-4 bg-slate-900 border-success">
                    <div class="text-center font-weight-black text-h3 text-success mb-2">
                      SỐ: {{ lastConfirmedApp.queueNumber }}
                    </div>
                    <div class="text-caption text-center text-grey mb-4">HÀNG CHỜ PHÒNG KHÁM</div>
                    <v-divider class="mb-4" />
                    <div class="text-subtitle-2 mb-1">Bệnh nhân: <strong>{{ lastConfirmedApp.patientName }}</strong></div>
                    <div class="text-subtitle-2 mb-1">Bác sĩ: <strong>{{ lastConfirmedApp.doctorName }}</strong></div>
                    <div class="text-subtitle-2 mb-1">Khung giờ hẹn: <strong>{{ lastConfirmedApp.timeSlot }}</strong></div>
                    <div class="text-subtitle-2 mb-1">Trạng thái: <span class="text-success">Đã xác nhận & xếp hàng</span></div>
                    <v-btn block color="success" variant="outlined" size="small" class="mt-4" prepend-icon="mdi-printer">
                      In Phiếu Khám Số Thứ Tự
                    </v-btn>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- 3. DOCTOR PORTAL TAB -->
          <v-window-item value="doctor">
            <v-row>
              <!-- Choose Doctor -->
              <v-col cols="12" md="4">
                <v-card border flat class="bg-surface pa-6 mb-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon icon="mdi-account-settings-outline" color="primary" class="mr-2" />
                    <h2 class="text-h6 font-weight-bold">Chọn Bác Sĩ Trực Ca</h2>
                  </div>

                  <v-select
                    v-model="doctorPortal.doctorId"
                    :items="doctors"
                    item-title="fullName"
                    item-value="id"
                    label="Chọn Bác Sĩ"
                    variant="outlined"
                    density="comfortable"
                    @update:model-value="fetchDoctorActiveQueue"
                  />

                  <div v-if="doctorPortal.doctorId" class="mt-4">
                    <v-btn block color="primary" prepend-icon="mdi-refresh" @click="fetchDoctorActiveQueue" :loading="loading">
                      Cập nhật hàng chờ
                    </v-btn>
                  </div>
                </v-card>
              </v-col>

              <!-- Patient list inside doctor's queue -->
              <v-col cols="12" md="8">
                <v-card border flat class="bg-surface pa-6">
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-list-status" color="primary" class="mr-2" />
                      <h2 class="text-h6 font-weight-bold">Bệnh Nhân Đang Chờ Khám Hôm Nay</h2>
                    </div>
                    <v-chip v-if="doctorPortal.doctorId" color="info" size="small">
                      Đang đợi: {{ doctorQueue.filter(q => q.status === 'ChoKham').length }}
                    </v-chip>
                  </div>

                  <v-alert v-if="!doctorPortal.doctorId" type="info" variant="text">
                    Vui lòng chọn bác sĩ ở cột bên trái để quản lý danh sách khám bệnh.
                  </v-alert>
                  <v-alert v-else-if="doctorQueue.length === 0" type="info" variant="text">
                    Hôm nay bác sĩ chưa có bệnh nhân nào trong hàng chờ.
                  </v-alert>

                  <v-row v-else density="comfortable">
                    <v-col v-for="qItem in sortedDoctorQueue" :key="qItem.id" cols="12">
                      <v-card
                        border
                        flat
                        :class="qItem.status === 'DangKham' ? 'pa-4 bg-slate-900 border-primary' : 'pa-4'"
                      >
                        <div class="d-flex justify-space-between align-center">
                          <div>
                            <div class="d-flex align-center gap-2 mb-1">
                              <v-avatar color="primary" size="32" class="font-weight-black text-subtitle-2 mr-2">
                                {{ qItem.queueNumber }}
                              </v-avatar>
                              <span class="font-weight-bold text-subtitle-1">{{ qItem.patientName }}</span>
                              <v-chip size="x-small" :color="qItem.status === 'DangKham' ? 'primary' : 'grey'">
                                {{ qItem.status }}
                              </v-chip>
                            </div>
                            <div class="text-caption text-grey ml-10">
                              Giờ vào tiếp nhận: {{ formatTime(qItem.checkInTime) }}
                            </div>
                          </div>
                          
                          <div class="d-flex gap-2">
                            <!-- Call next / Start call -->
                            <v-btn
                              v-if="qItem.status === 'ChoKham'"
                              color="primary"
                              size="small"
                              prepend-icon="mdi-volume-high"
                              @click="updateQueueStatus(qItem.id, 2)"
                            >
                              Gọi Khám (Đang Khám)
                            </v-btn>
                            <!-- Complete consultation -->
                            <v-btn
                              v-if="qItem.status === 'DangKham'"
                              color="success"
                              size="small"
                              prepend-icon="mdi-check-bold"
                              @click="updateQueueStatus(qItem.id, 4)"
                            >
                              Xong Ca Khám
                            </v-btn>
                            <!-- Skip patient -->
                            <v-btn
                              v-if="qItem.status === 'ChoKham' || qItem.status === 'DangKham'"
                              color="warning"
                              variant="outlined"
                              size="small"
                              @click="updateQueueStatus(qItem.id, 3)"
                            >
                              Bỏ Qua
                            </v-btn>
                          </div>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- 4. TV QUEUE SCREEN TAB -->
          <v-window-item value="tv">
            <v-card border flat class="bg-surface pa-8">
              <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center">
                  <span class="pulse-dot mr-3"></span>
                  <h1 class="text-h4 font-weight-black text-primary">MÀN HÌNH THEO DÕI HÀNG CHỜ PHÒNG KHÁM</h1>
                </div>
                <div class="text-subtitle-1 text-grey-lighten-1">
                  Cập nhật thời gian thực (5s/lần)
                </div>
              </div>

              <v-divider class="mb-6" />

              <v-alert v-if="tvQueue.length === 0" type="info" variant="tonal" class="text-center pa-8">
                Hiện tại hàng chờ hôm nay trống. Hãy thực hiện đặt lịch khám và xác nhận để xếp số thứ tự.
              </v-alert>

              <!-- Queue Board Split by Doctors -->
              <v-row v-else>
                <v-col v-for="group in tvQueueGroupedByDoctor" :key="group.doctorName" cols="12" md="6" lg="4">
                  <v-card border flat class="pa-5 bg-slate-900 h-100">
                    <div class="text-h6 font-weight-bold text-primary mb-3 d-flex align-center">
                      <v-icon icon="mdi-doctor" class="mr-2" />
                      {{ group.doctorName }}
                    </div>
                    
                    <!-- Currently consultation patient (DangKham) -->
                    <div class="bg-surface pa-4 rounded-lg border border-primary mb-4 text-center">
                      <div class="text-caption text-primary font-weight-bold">ĐANG KHÁM</div>
                      <div class="text-h2 font-weight-black text-success py-2">
                        {{ group.currentlyCalling ? group.currentlyCalling.queueNumber : '---' }}
                      </div>
                      <div class="text-subtitle-1 text-truncate font-weight-medium">
                        {{ group.currentlyCalling ? group.currentlyCalling.patientName : '(Chờ gọi khám)' }}
                      </div>
                    </div>

                    <!-- Patients waiting (ChoKham) -->
                    <div class="text-caption text-grey font-weight-bold mb-2">DANH SÁCH CHỜ ĐỢI KHÁM:</div>
                    <div v-if="group.waitingList.length === 0" class="text-body-2 text-grey-lighten-1 text-center py-2">
                      Không có bệnh nhân chờ.
                    </div>
                    <v-list v-else bg-color="transparent" density="compact" class="pa-0">
                      <v-list-item v-for="wait in group.waitingList" :key="wait.id" class="px-0 py-1">
                        <template v-slot:prepend>
                          <v-chip color="primary" size="small" class="font-weight-black mr-2">{{ wait.queueNumber }}</v-chip>
                        </template>
                        <v-list-item-title class="font-weight-medium text-body-1">{{ wait.patientName }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

export default {
  name: 'App',
  setup() {
    // API Configurations
    const menuOpen = ref(false)
    const apiUrl = ref(localStorage.getItem('clinic_api_url') || 'http://localhost:5000/api')
    const jwtToken = ref(localStorage.getItem('clinic_jwt_token') || '')
    const activeRole = ref('')

    // App state
    const activeTab = ref('booking')
    const loading = ref(false)
    const alert = ref({
      show: false,
      type: 'info',
      message: ''
    })

    // Data lists
    const doctors = ref([])
    const specialties = ref([])
    const selectedSpecialty = ref(null)
    const availableSchedules = ref([])
    const pendingAppointments = ref([])
    const recentTicket = ref(null)
    
    // Search Receptionist
    const searchQuery = ref({
      code: '',
      phone: ''
    })
    const searchResults = ref(null)
    const lastConfirmedApp = ref(null)

    // Doctor portal
    const doctorPortal = ref({
      doctorId: null
    })
    const doctorQueue = ref([])

    // TV Queue portal
    const tvQueue = ref([])
    let tvInterval = null

    // Helper functions
    const showAlert = (message, type = 'info') => {
      alert.value.message = message
      alert.value.type = type
      alert.value.show = true
      setTimeout(() => {
        alert.value.show = false
      }, 5000)
    }

    const formatMoney = (val) => {
      if (!val) return '0'
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    const formatTime = (timeString) => {
      if (!timeString) return ''
      const date = new Date(timeString)
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }

    const formatTimeSpan = (timeSpanString) => {
      if (!timeSpanString) return ''
      // TimeSpan return usually "hh:mm:ss"
      return timeSpanString.substring(0, 5)
    }

    const getStatusColor = (status) => {
      switch (status) {
        case 'ChoXacNhan': return 'warning'
        case 'DaXacNhan': return 'success'
        case 'DangKham': return 'primary'
        case 'DaKham': return 'grey'
        case 'DaHuy': return 'error'
        default: return 'info'
      }
    }

    // Fetch initial data
    const fetchDoctors = async () => {
      try {
        const url = `${apiUrl.value}/doctors?isActive=true`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Không thể tải danh sách bác sĩ')
        const data = await res.json()
        doctors.value = data
        
        // Extract unique specialties
        specialties.value = [...new Set(data.map(d => d.specialty))]
      } catch (err) {
        showAlert(err.message, 'error')
      }
    }

    const filteredDoctors = computed(() => {
      if (!selectedSpecialty.value) return doctors.value
      return doctors.value.filter(d => d.specialty === selectedSpecialty.value)
    })

    const onFilterChange = () => {
      bookingForm.value.doctorId = ''
      bookingForm.value.scheduleId = ''
      availableSchedules.value = []
    }

    // Selecting Doctor & Schedule
    const bookingForm = ref({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      appointmentDate: '',
      timeSlot: '',
      doctorId: '',
      scheduleId: '',
      notes: ''
    })

    const selectDoctor = async (doc) => {
      bookingForm.value.doctorId = doc.id
      bookingForm.value.scheduleId = ''
      availableSchedules.value = []
      
      try {
        const url = `${apiUrl.value}/schedules/available?doctorId=${doc.id}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Không thể tải lịch của bác sĩ')
        const data = await res.json()
        availableSchedules.value = data
      } catch (err) {
        showAlert(err.message, 'error')
      }
    }

    const selectSchedule = (sch) => {
      bookingForm.value.scheduleId = sch.id
      bookingForm.value.appointmentDate = sch.date
      // auto set time slot default start time
      bookingForm.value.timeSlot = sch.startTime
    }

    // Book Appointment
    const bookAppointment = async () => {
      try {
        loading.value = true
        const url = `${apiUrl.value}/appointments/book`
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingForm.value)
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data || 'Đăng ký đặt lịch thất bại')
        }

        recentTicket.value = data
        showAlert('Đăng ký đặt lịch thành công!', 'success')
        
        // Reset form
        bookingForm.value = {
          patientName: '',
          patientPhone: '',
          patientEmail: '',
          appointmentDate: '',
          timeSlot: '',
          doctorId: '',
          scheduleId: '',
          notes: ''
        }
        
        // Refresh doctors/schedules
        await fetchDoctors()
        
        // If doctor was selected, reload schedules
        if (bookingForm.value.doctorId) {
          const matchedDoc = doctors.value.find(d => d.id === bookingForm.value.doctorId)
          if (matchedDoc) selectDoctor(matchedDoc)
        }
      } catch (err) {
        showAlert(err.message, 'error')
      } finally {
        loading.value = false
      }
    }

    // Receptionist Functions
    const fetchPendingAppointments = async () => {
      try {
        loading.value = true
        const url = `${apiUrl.value}/appointments/pending`
        const headers = {}
        if (jwtToken.value) {
          headers['Authorization'] = `Bearer ${jwtToken.value}`
        }

        const res = await fetch(url, { headers })
        if (res.status === 401) throw new Error('Yêu cầu Token để đăng nhập (Xem phần Cấu hình kết nối)')
        if (res.status === 403) throw new Error('Bạn không có quyền hạn Tiếp Tân')
        if (!res.ok) throw new Error('Không thể tải cuộc hẹn chờ xác nhận')
        
        const data = await res.json()
        pendingAppointments.value = data
      } catch (err) {
        showAlert(err.message, 'error')
      } finally {
        loading.value = false
      }
    }

    const confirmAppointment = async (id) => {
      try {
        loading.value = true
        const url = `${apiUrl.value}/queue/confirm-appointment/${id}`
        const headers = {
          'Content-Type': 'application/json'
        }
        if (jwtToken.value) {
          headers['Authorization'] = `Bearer ${jwtToken.value}`
        }

        const res = await fetch(url, {
          method: 'POST',
          headers
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data || 'Xác nhận lịch hẹn thất bại')

        lastConfirmedApp.value = data
        showAlert(`Đã xác nhận thành công bệnh nhân: ${data.patientName}. Cấp số: ${data.queueNumber}`, 'success')
        
        if (searchResults.value) {
          // If searching, refresh search
          searchAppointments()
        } else {
          // Refresh list
          fetchPendingAppointments()
        }
      } catch (err) {
        showAlert(err.message, 'error')
      } finally {
        loading.value = false
      }
    }

    const cancelAppointment = async (id) => {
      if (!confirm('Bạn có chắc chắn muốn hủy cuộc hẹn này không?')) return

      try {
        loading.value = true
        const url = `${apiUrl.value}/appointments/${id}/cancel`
        const res = await fetch(url, {
          method: 'PUT'
        })

        if (!res.ok) throw new Error('Hủy lịch hẹn thất bại')

        showAlert('Đã hủy lịch hẹn thành công', 'success')
        
        if (searchResults.value) {
          searchAppointments()
        } else {
          fetchPendingAppointments()
        }
      } catch (err) {
        showAlert(err.message, 'error')
      } finally {
        loading.value = false
      }
    }

    const searchAppointments = async () => {
      try {
        const { code, phone } = searchQuery.value
        if (!code && !phone) {
          showAlert('Vui lòng nhập Mã hoặc SĐT tra cứu', 'warning')
          return
        }

        loading.value = true
        let url = `${apiUrl.value}/appointments/search?`
        if (code) url += `code=${code}&`
        if (phone) url += `phone=${phone}`

        const res = await fetch(url)
        if (!res.ok) throw new Error('Lỗi tìm kiếm cuộc hẹn')
        
        const data = await res.json()
        searchResults.value = data
      } catch (err) {
        showAlert(err.message, 'error')
      } finally {
        loading.value = false
      }
    }

    const clearSearch = () => {
      searchResults.value = null
      searchQuery.value = { code: '', phone: '' }
      fetchPendingAppointments()
    }

    // Doctor Board Functions
    const fetchDoctorActiveQueue = async () => {
      if (!doctorPortal.value.doctorId) return
      
      try {
        const url = `${apiUrl.value}/queue/active?doctorId=${doctorPortal.value.doctorId}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Không thể tải hàng chờ của bác sĩ')
        const data = await res.json()
        doctorQueue.value = data
      } catch (err) {
        showAlert(err.message, 'error')
      }
    }

    const sortedDoctorQueue = computed(() => {
      // Show DangKham first, then ChoKham sorted by QueueNumber
      return [...doctorQueue.value].sort((a, b) => {
        if (a.status === 'DangKham' && b.status !== 'DangKham') return -1
        if (a.status !== 'DangKham' && b.status === 'DangKham') return 1
        return a.queueNumber - b.queueNumber
      })
    })

    const updateQueueStatus = async (queueId, statusCode) => {
      try {
        loading.value = true
        const url = `${apiUrl.value}/queue/${queueId}/status`
        const headers = {
          'Content-Type': 'application/json'
        }
        if (jwtToken.value) {
          headers['Authorization'] = `Bearer ${jwtToken.value}`
        }

        const res = await fetch(url, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ status: statusCode })
        })

        if (res.status === 401) throw new Error('Token không hợp lệ hoặc đã hết hạn')
        if (res.status === 403) throw new Error('Không có quyền thay đổi trạng thái khám')
        if (!res.ok) throw new Error('Không thể cập nhật trạng thái hàng chờ')

        showAlert('Cập nhật trạng thái khám thành công', 'success')
        fetchDoctorActiveQueue()
      } catch (err) {
        showAlert(err.message, 'error')
      } finally {
        loading.value = false
      }
    }

    // TV Queue Functions
    const fetchTvQueue = async () => {
      try {
        const url = `${apiUrl.value}/queue/active`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Không thể tải hàng chờ Tivi')
        const data = await res.json()
        tvQueue.value = data
      } catch (err) {
        // fail silently for auto-refresh
        console.error(err.message)
      }
    }

    const tvQueueGroupedByDoctor = computed(() => {
      const groups = {}
      
      // Group by DoctorName
      tvQueue.value.forEach(item => {
        const name = item.doctorName || 'Bác sĩ trực ban'
        if (!groups[name]) {
          groups[name] = {
            doctorName: name,
            currentlyCalling: null,
            waitingList: []
          }
        }
        
        if (item.status === 'DangKham') {
          groups[name].currentlyCalling = item
        } else if (item.status === 'ChoKham') {
          groups[name].waitingList.push(item)
        }
      })
      
      // Sort waiting list by queueNumber
      Object.keys(groups).forEach(key => {
        groups[key].waitingList.sort((a, b) => a.queueNumber - b.queueNumber)
      })

      return Object.values(groups)
    })

    // TestAuth Token generator
    const fetchTestToken = async (role) => {
      try {
        const url = `${apiUrl.value}/testauth/token?role=${role}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Không thể tạo token thử nghiệm')
        const data = await res.json()
        
        jwtToken.value = data.token
        activeRole.value = role
        showAlert(`Đăng nhập thành công dưới quyền ${role} (Token đã được áp dụng!)`, 'success')
        
        // Trigger reload tabs if in specific sections
        if (activeTab.value === 'reception') {
          fetchPendingAppointments()
        } else if (activeTab.value === 'doctor') {
          fetchDoctorActiveQueue()
        }
      } catch (err) {
        showAlert(err.message, 'error')
      }
    }

    const applyConfiguration = () => {
      localStorage.setItem('clinic_api_url', apiUrl.value)
      localStorage.setItem('clinic_jwt_token', jwtToken.value)
      
      showAlert('Đã áp dụng cấu hình và lưu vào hệ thống!', 'success')
      menuOpen.value = false

      // Tự động reload lại dữ liệu tương ứng của tab đang hoạt động để người dùng thấy ngay kết quả
      if (activeTab.value === 'booking') {
        fetchDoctors()
      } else if (activeTab.value === 'reception' && jwtToken.value) {
        fetchPendingAppointments()
      } else if (activeTab.value === 'doctor' && doctorPortal.value.doctorId) {
        fetchDoctorActiveQueue()
      } else if (activeTab.value === 'tv') {
        fetchTvQueue()
      }
    }

    // Watch tab changes to auto-load data for the selected tab
    watch(activeTab, (newTab) => {
      if (newTab === 'reception' && jwtToken.value) {
        fetchPendingAppointments()
      } else if (newTab === 'doctor' && doctorPortal.value.doctorId) {
        fetchDoctorActiveQueue()
      } else if (newTab === 'tv') {
        fetchTvQueue()
      }
    })

    // Auto update TV panel
    onMounted(() => {
      fetchDoctors()
      fetchTvQueue()

      // Set interval for TV board every 5s
      tvInterval = setInterval(() => {
        fetchTvQueue()
        if (activeTab.value === 'doctor') {
          fetchDoctorActiveQueue()
        }
        if (activeTab.value === 'reception' && jwtToken.value) {
          fetchPendingAppointments()
        }
      }, 5000)
    })

    onUnmounted(() => {
      if (tvInterval) clearInterval(tvInterval)
    })

    return {
      menuOpen,
      apiUrl,
      jwtToken,
      activeRole,
      activeTab,
      loading,
      alert,
      
      // Data refs
      doctors,
      specialties,
      selectedSpecialty,
      availableSchedules,
      pendingAppointments,
      recentTicket,
      bookingForm,
      
      // Search
      searchQuery,
      searchResults,
      lastConfirmedApp,
      
      // Doctor board
      doctorPortal,
      doctorQueue,
      sortedDoctorQueue,
      
      // TV Queue
      tvQueue,
      tvQueueGroupedByDoctor,

      // Functions
      selectDoctor,
      selectSchedule,
      bookAppointment,
      confirmAppointment,
      cancelAppointment,
      searchAppointments,
      clearSearch,
      fetchPendingAppointments,
      fetchDoctorActiveQueue,
      updateQueueStatus,
      fetchTestToken,
      onFilterChange,
      applyConfiguration,
      
      // Helpers
      formatMoney,
      formatDate,
      formatTime,
      formatTimeSpan,
      getStatusColor,
      filteredDoctors
    }
  }
}
</script>

<style>
.hover-card {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #334155 !important;
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(56, 189, 248, 0.1), 0 4px 6px -4px rgba(56, 189, 248, 0.1);
  border-color: #475569 !important;
}

/* Custom styles for background container */
.v-application {
  background: #0F172A !important;
}

.bg-background {
  background-color: #0F172A !important;
}

.bg-surface {
  background-color: #1E293B !important;
}

.bg-slate-900 {
  background-color: #0B0F19 !important;
}

/* TV screen pulsing indicator */
.pulse-dot {
  width: 12px;
  height: 12px;
  background-color: #F87171;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.7);
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(248, 113, 113, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(248, 113, 113, 0);
  }
}
</style>
