# Base stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8000
EXPOSE 80

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["ClinicGateway/ClinicGateway.csproj", "ClinicGateway/"]
RUN dotnet restore "ClinicGateway/ClinicGateway.csproj"

# Copy all files and build
COPY . .
WORKDIR "/src/ClinicGateway"
RUN dotnet build "ClinicGateway.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "ClinicGateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ClinicGateway.dll"]
