package database

import (
	"fmt"
	"log"
	"santrikoding/backend-api/config"
	"santrikoding/backend-api/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// buat variabel global DB agar bisa digunakan di package lain
var DB *gorm.DB 

func InitDB() {

	// Load konfigurasi database dari .env
	dbUser := config.GetEnv("DB_USER", "root")
	dbPass := config.GetEnv("DB_PASS", "")
	dbHost := config.GetEnv("DB_HOST", "localhost")
	dbPort := config.GetEnv("DB_PORT", "3306")
	dbName := config.GetEnv("DB_NAME", "db_golang") // Beri default value "db_golang"

	// Format DSN untuk MySQL
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPass, dbHost, dbPort, dbName)

	// Koneksi ke database
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)  // jika koneksi gagal
	}

	fmt.Println("Database connected successfully!")  //jika koneksi berhasil

	// **Auto Migrate Models**
	err = DB.AutoMigrate(&models.User{}) // Tambahkan model lain jika perlu
	if err != nil {
		log.Fatal("Failed to migrate database:", err)  // jika proses migrate gagal
	}

	fmt.Println("Database migrated successfully!")  // jika migrate berhasil
}