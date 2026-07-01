# HỆ THỐNG ĐẶT LỊCH & QUẢN LÝ PHÒNG KHÁM - CLINICFLOW (NHÓM 5)
## BÀI TẬP LỚN PHÁT TRIỂN ỨNG DỤNG FULL STACK - ĐỀ TÀI 05

Dự án này chứa mã nguồn của thành phần cốt lõi **Nhóm 5** (Hệ thống đặt lịch & phân luồng phòng khám) trong môn học Phát triển ứng dụng Full Stack. Hệ thống được thiết kế theo kiến trúc Microservices kết hợp với API Gateway và giao diện Frontend đồng bộ để phục vụ quy trình đặt lịch khám và phân luồng hàng chờ y tế.

Tài liệu này mô tả mã nguồn và các tính năng phát triển trên nhánh **`feature`** (được phát triển thêm và cải tiến từ nhánh `master`).

---

## 1. Các điểm phát triển thêm trên nhánh `feature` so với nhánh `master`

So với nhánh `master` chỉ có các thành phần API thô sơ, nhánh `feature` đã tích hợp đầy đủ giải pháp giao diện người dùng và tài liệu hóa quy trình nghiệp vụ:

### 1.1. Tích hợp và Khởi tạo dự án ClinicFrontend
- Khởi tạo dự án Frontend hoàn chỉnh sử dụng **VueJS 3 + Vite** và cài đặt các thư viện định tuyến (Vue Router).
- Xây dựng các trang giao diện nghiệp vụ đồng bộ bao gồm:
  - **Trang chủ Bệnh nhân (Landing Page)**: Tìm kiếm bác sĩ, lọc theo chuyên khoa và tiến hành đăng ký đặt lịch khám trực tuyến.
  - **Trang Đăng nhập (Login Page)**: Giao diện đăng nhập tập trung hỗ trợ phân quyền người dùng.
  - **Bảng điều khiển nghiệp vụ (Dashboard Page)**: Thiết kế giao diện quản trị phân quyền cho cả 4 vai trò (Admin, Tiếp tân, Bác sĩ, Bệnh nhân).

### 1.2. Bản vẽ sơ đồ quy trình liên thông hệ thống (clinic_workflow.md)
- Xây dựng tài liệu chi tiết mô tả luồng hoạt động nghiệp vụ y tế khép kín giữa 3 dịch vụ của 3 nhóm (Nhóm 4 - Bệnh án, Nhóm 5 - Đặt lịch & Hàng chờ, Nhóm 6 - Kho thuốc & Thanh toán).
- Tích hợp sơ đồ **Sequence Diagram (Mermaid)** trực quan thể hiện luồng tương tác thời gian thực từ lúc đặt lịch, đón tiếp tại quầy, khám bệnh kê đơn đến lúc tính tiền hóa đơn và phát thuốc ra về.

### 1.3. Tích hợp Mockup giao diện tĩnh (HTML/CSS & Ảnh màn hình)
- Lưu trữ toàn bộ mockup giao diện tại thư mục `stitch_microservices_clinic_management_system/`.
- Mỗi màn hình bao gồm file mã nguồn tĩnh (`code.html`) và hình ảnh trực quan (`screen.png`) cho 5 nghiệp vụ chính:
  - Trang chủ hệ thống (`trang_chu_clinicflow`).
  - Trang đăng nhập phân quyền (`ng_nh_p_clinicflow`).
  - Tiếp nhận, thu viện phí và quản lý hàng chờ (`tiep_nhan_thu_phi_quan_ly_hang_cho`).
  - Bác sĩ khám bệnh lâm sàng (`clinical_precision`).
  - Quản lý thông tin bác sĩ và lịch trực (`bac_si_va_lich_truc`).

---

## 2. Cấu trúc thư mục dự án trên branch `feature`

```text
AppointmentService/
    ├── AppointmentService/                  # Dịch vụ Đặt lịch & Phân luồng (Nhóm 5 Backend)
    │     ├── AppointmentService.API/         # API chính, Controllers, DTOs, cấu hình
    │     ├── AppointmentService.Domain/      # Thực thể dữ liệu (Doctor, Schedule, Appointment)
    │     ├── AppointmentService.Infrastructure/ # Cấu hình CSDL, Khởi tạo dữ liệu, Repositories
    │     └── AppointmentService.Tests/       # Bộ kiểm thử tự động xUnit (InMemory Database)
    │
    ├── ClinicGateway/                       # Cổng kết nối API Gateway (Ocelot)
    │     ├── ocelot.json                    # Cấu hình định tuyến và xác thực API
    │     └── Program.cs
    │
    ├── ClinicFrontend/                      # Giao diện VueJS 3 cho hệ thống ClinicFlow (Mới thêm)
    │     ├── src/
    │     │    ├── views/
    │     │    │    ├── LandingPage.vue      # Giao diện trang chủ đặt lịch của Bệnh nhân
    │     │    │    ├── LoginPage.vue        # Giao diện đăng nhập tập trung
    │     │    │    └── DashboardPage.vue    # Giao diện nghiệp vụ Tiếp tân, Bác sĩ, Admin
    │     │    ├── router/                   # Cấu hình định tuyến Frontend
    │     │    └── main.js
    │     └── package.json
    │
    ├── stitch_microservices_clinic_management_system/ # Bộ Mockup giao diện tĩnh (Mới thêm)
    │     ├── trang_chu_clinicflow/          # File code.html và ảnh chụp screen.png
    │     ├── ng_nh_p_clinicflow/            # File code.html và ảnh chụp screen.png
    │     ├── tiep_nhan_thu_phi_quan_ly_hang_cho/ # File code.html và ảnh chụp screen.png
    │     ├── clinical_precision/            # File code.html, DESIGN.md và ảnh chụp screen.png
    │     └── bac_si_va_lich_truc/           # File code.html và ảnh chụp screen.png
    │
    ├── clinic_workflow.md                   # Luồng hoạt động liên thông hệ thống (Mới thêm)
    ├── docker-compose.yml                   # Cấu hình khởi chạy nhanh hệ thống bằng Docker Compose
    └── README.md                            # Hướng dẫn dự án
```

---

## 3. Hướng dẫn chạy thử dự án (Local Development)

### Cách 1: Chạy bằng Docker Compose (Khuyên dùng)
Hệ thống Docker Compose tự động khởi chạy SQL Server, tạo cơ sở dữ liệu mẫu, build API và kết nối trực tiếp với Frontend.

1. Đảm bảo phần mềm Docker Desktop đã được bật.
2. Mở thư mục gốc `AppointmentService` bằng terminal.
3. Chạy lệnh sau để khởi động toàn bộ hệ thống:
   ```bash
   docker-compose up --build
   ```
4. Khi chạy thành công:
   - **Giao diện Người dùng (Clinic Frontend)**: Lắng nghe tại cổng **3000** (Truy cập tại: [http://localhost:3000](http://localhost:3000)).
   - **Cổng kết nối chung (Clinic Gateway)**: Lắng nghe tại cổng **8000** (Định tuyến API: `http://localhost:8000/api/appointments-service/{path}`).
   - **Dịch vụ Đặt lịch (Appointment API)**: Trực tiếp lắng nghe tại cổng **5000** (Swagger UI: [http://localhost:5000/index.html](http://localhost:5000/index.html)).

### Cách 2: Chạy trực tiếp từ Visual Studio hoặc .NET CLI
Nếu bạn muốn phát triển hoặc debug riêng lẻ từng dịch vụ:

1. **Khởi động các dịch vụ Backend**:
   - Chạy Appointment Service:
     ```bash
     dotnet run --project AppointmentService/AppointmentService.API/AppointmentService.API.csproj
     ```
   - Chạy API Gateway:
     ```bash
     dotnet run --project ClinicGateway/ClinicGateway.csproj
     ```

2. **Khởi động mã nguồn Frontend**:
   - Di chuyển vào thư mục Frontend:
     ```bash
     cd ClinicFrontend
     ```
   - Cài đặt thư viện phụ thuộc (lần đầu tiên):
     ```bash
     npm install
     ```
   - Chạy máy chủ phát triển Frontend:
     ```bash
     npm run dev
     ```
   - Truy cập giao diện người dùng tại cổng **3000**. Bạn có thể sử dụng nút **"Cấu hình kết nối"** ở góc trên bên phải màn hình để thiết lập URL kết nối API.

---

## 4. Cơ sở dữ liệu mẫu (Seed Data)

Khi khởi chạy dịch vụ lần đầu tiên, hệ thống sẽ tự động tạo Cơ sở dữ liệu và chèn dữ liệu mẫu (Seed Data) bao gồm:
- **4 Bác sĩ**: Cấu hình đầy đủ thông tin chuyên khoa, bằng cấp, phí khám.
- **Lịch làm việc**: Tự động sinh ca trực cho các bác sĩ trong vòng 7 ngày tiếp theo kể từ ngày hiện tại để đảm bảo luôn có ca khám trống khi thực hiện test.
- **Lịch hẹn & Hàng chờ**: Một số lịch hẹn mẫu và hàng chờ tiếp nhận để kiểm tra danh sách hiển thị trên các màn hình Dashboard.

---

## 5. Hướng dẫn kiểm thử JWT Authentication và API trên Swagger

Vì hệ thống yêu cầu xác thực JWT qua API Gateway với **Shared Secret Key**, dự án đã được tích hợp bộ lọc Swagger hỗ trợ gửi Token. Để kiểm thử độc lập mà không cần chạy Auth Service của nhóm khác:

1. **Lấy Token kiểm thử**:
   - Trên Swagger UI (`http://localhost:5000/index.html`), tìm nhóm API `TestAuth`.
   - Gọi API `GET /api/testauth/token` với tham số `role` mong muốn (ví dụ: `Admin`, `Receptionist`, `Doctor`, `Patient`).
   - Sao chép chuỗi mã thông báo JWT trong trường `token` ở kết quả trả về.

2. **Áp dụng Token vào Swagger**:
   - Cuộn lên đầu giao diện Swagger, nhấn nút **Authorize** ở góc bên phải.
   - Nhập: `Bearer {chuỗi_token_đã_copy}`.
   - Nhấn **Authorize** rồi nhấn **Close**.
   - Bây giờ bạn có thể gọi các API yêu cầu quyền hạn cao (Admin, Receptionist, Doctor) bình thường.

---

## 6. Danh sách các API chính

### Quản lý Bác sĩ (`Doctors`)
- `GET /api/doctors`: Lấy danh sách bác sĩ hoạt động (Cho phép lọc theo chuyên khoa).
- `GET /api/doctors/{id}`: Chi tiết bác sĩ.
- `POST /api/doctors` [Quyền: Admin]: Thêm bác sĩ mới.
- `PUT /api/doctors/{id}` [Quyền: Admin]: Sửa thông tin bác sĩ.
- `DELETE /api/doctors/{id}` [Quyền: Admin]: Đổi trạng thái hoạt động (Soft Delete).

### Quản lý Lịch làm việc (`Schedules`)
- `GET /api/schedules` [Quyền: Admin, Receptionist]: Xem tất cả lịch làm việc của bác sĩ theo ngày.
- `GET /api/schedules/available`: Xem danh sách ca làm việc còn trống của các bác sĩ kể từ ngày hôm nay (dành cho bệnh nhân đặt lịch).
- `POST /api/schedules` [Quyền: Admin]: Tạo lịch làm việc mới cho bác sĩ.

### Đặt lịch hẹn (`Appointments`)
- `POST /api/appointments/book`: Bệnh nhân đăng ký đặt lịch khám. Hệ thống tự động kiểm tra trùng ca khám (Conflict Slot), kiểm tra giới hạn số bệnh nhân tối đa trong ca và kiểm tra đăng ký lặp để trả về lỗi hợp lý.
- `GET /api/appointments/pending` [Quyền: Admin, Receptionist]: Lấy danh sách lịch hẹn đang chờ tiếp tân xác nhận.
- `GET /api/appointments/search`: Tìm kiếm lịch hẹn của bệnh nhân theo Số điện thoại hoặc Mã lịch hẹn.
- `PUT /api/appointments/{id}/cancel`: Hủy lịch hẹn (Nếu lịch hẹn đã được xác nhận trước đó, ca khám của bác sĩ sẽ tự động được hoàn lại 1 chỗ trống).

### Hàng chờ tiếp nhận (`Queue`)
- `POST /api/queue/confirm-appointment/{appointmentId}` [Quyền: Admin, Receptionist]: Tiếp tân xác nhận lịch hẹn của bệnh nhân. Trạng thái lịch hẹn chuyển sang `DaXacNhan`, hệ thống tự động sinh số thứ tự xếp hàng khám (Queue Number) tăng dần theo bác sĩ trong ngày, đồng thời tạo một bản ghi hàng chờ ở trạng thái `ChoKham`.
- `GET /api/queue/active`: Lấy danh sách hàng chờ hiện tại trong ngày của các bác sĩ (chỉ hiển thị những ca đang ở trạng thái `ChoKham` hoặc `DangKham` để đưa lên màn hình tivi hàng chờ).
- `PUT /api/queue/{id}/status` [Quyền: Admin, Receptionist, Doctor]: Cập nhật trạng thái hàng chờ khám (1: ChoKham, 2: DangKham, 3: DaHoanThanh, 4: BoQua). Khi cập nhật trạng thái này, trạng thái của lịch hẹn gốc tương ứng cũng sẽ tự động được cập nhật đồng bộ sang `DangKham` hoặc `DaKham`.

---

## 7. Hướng dẫn chạy Unit Tests

Dự án kiểm thử `AppointmentService.Tests` chứa các kịch bản kiểm thử tự động sử dụng **xUnit** và cơ sở dữ liệu ảo **InMemory Database** để kiểm tra tính chính xác của các logic nghiệp vụ quan trọng.

Để chạy các bài kiểm tra, mở terminal tại thư mục gốc và chạy lệnh:
```bash
dotnet test
```

---

## 8. Cấu hình Mạng LAN ảo (Radmin VPN) khi ghép nối lớp

Để chuẩn bị cho buổi báo cáo chạy liên kết giữa 3 nhóm trong Đề tài 5, dưới đây là thông tin địa chỉ IP Radmin VPN đã được xác định:

- **Dịch vụ của bạn - Nhóm 5 (Appointment Service)**: Địa chỉ IP Radmin VPN là `26.88.31.108` (Cổng dịch vụ: `5000` hoặc cổng chạy Docker `5000`).
- **Dịch vụ Nhóm 4 (Medical Record Service)**: Địa chỉ IP Radmin VPN là `26.15.45.202` (Gateway định tuyến yêu cầu bệnh án về IP này).
- **Dịch vụ Nhóm 6 (Pharmacy & Billing Service / Auth)**: Địa chỉ IP Radmin VPN là `26.71.15.204` (Mọi token JWT sẽ do dịch vụ chạy tại IP này phát hành).

### Hướng dẫn kiểm tra nhanh kết nối giữa các nhóm:
1. Mở Command Prompt hoặc PowerShell trên máy và sử dụng lệnh ping để kiểm tra kết nối mạng ảo tới các nhóm khác:
   - Kiểm tra kết nối tới Nhóm 4: `ping 26.15.45.202`
   - Kiểm tra kết nối tới Nhóm 6: `ping 26.71.15.204`
2. Đảm bảo rằng tệp cấu hình của Gateway và dự án Frontend dùng chung đã cấu hình đúng các địa chỉ IP này cho các API tương ứng.
