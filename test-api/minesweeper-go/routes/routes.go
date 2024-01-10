package routes

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/nascarsayan/minesweeper-go/handlers"
	"gorm.io/gorm"
)

func SetupRoutes(app *fiber.App, db *gorm.DB, appFS http.FileSystem) {

	// Initialize handlers
	userHandler := handlers.NewUserHandler(db)
	gameHandler := handlers.NewGameHandler(db)
	boardHandler := handlers.NewBoardHandler(db)

	// User routes
	userRoutes := app.Group("/api/users")
	userRoutes.Get("/:id", userHandler.GetUserByID)
	userRoutes.Get("/username/:username", userHandler.GetUserByUsername)
	userRoutes.Post("/", userHandler.CreateUser)
	userRoutes.Put("/:id", userHandler.UpdateUser)
	userRoutes.Delete("/:id", userHandler.DeleteUser)

	// Game routes
	gameRoutes := app.Group("/api/games")
	gameRoutes.Get("/", gameHandler.GetGames)
	gameRoutes.Get("/:id", gameHandler.GetGameByID)
	gameRoutes.Post("/", gameHandler.CreateGame)
	gameRoutes.Put("/:id", gameHandler.UpdateGame)
	gameRoutes.Delete("/:id", gameHandler.DeleteGame)

	// Board routes
	boardRoutes := app.Group("/api/boards")
	boardRoutes.Get("/:id", boardHandler.GetBoardByID)
	boardRoutes.Post("/", boardHandler.CreateBoard)
	boardRoutes.Put("/:id", boardHandler.UpdateBoard)
	boardRoutes.Delete("/:id", boardHandler.DeleteBoard)

	// https://docs.gofiber.io/api/middleware/filesystem/#embed
	// https://github.com/proofrock/pupcloud/blob/4c740759c1047ac2884bf2cdab72a5f8fcfd4d12/src/main.go#L285
	app.Use("/", filesystem.New(filesystem.Config{
		Root: appFS,
	}))

}
