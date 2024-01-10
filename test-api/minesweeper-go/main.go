package main

import (
	"embed"
	"io/fs"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/nascarsayan/minesweeper-go/models"
	"github.com/nascarsayan/minesweeper-go/routes"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

//go:embed app/dist/*
var webApp embed.FS

func main() {
	app := fiber.New()

	// Initialize GORM SQLite database
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	err = db.AutoMigrate(
		&models.User{},
		&models.Game{},
		&models.Board{})
	if err != nil {
		panic("Failed to migrate models")
	}

	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*", // Change to your frontend URL or "*" for all origins
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))

	subFS, _ := fs.Sub(webApp, "app/dist")

	// Set up routes
	routes.SetupRoutes(app, db, http.FS(subFS))

	if err := app.Listen(":3030"); err != nil {
		panic(err)
	}
}
