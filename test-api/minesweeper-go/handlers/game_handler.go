// game_handler.go
package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/nascarsayan/minesweeper-go/models"
	"gorm.io/gorm"
)

// GameHandler contains the database instance
type GameHandler struct {
	DB *gorm.DB
}

// CreateGameDto represents the DTO for creating a game
type CreateGameDto struct {
	BoardWidth      int    `json:"boardWidth"`
	BoardHeight     int    `json:"boardHeight"`
	Difficulty      int    `json:"difficulty"`
	UserID          uint   `json:"userId"`
	DurationSeconds int    `json:"durationSeconds"`
	StartedAt       string `json:"startedAt"`
}

// CreateGame creates a new game
func (gh *GameHandler) CreateGame(c *fiber.Ctx) error {
	var createGameDto CreateGameDto

	if err := c.BodyParser(&createGameDto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// Parse the startedAt string to time.Time
	startedAt, err := time.Parse(time.RFC3339, createGameDto.StartedAt)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid startedAt format"})
	}

	// Create a new game instance
	newGame := models.Game{
		DurationSeconds: createGameDto.DurationSeconds,
		StartedAt:       startedAt,
		UserID:          createGameDto.UserID,
		BoardID:         0, // Set the board ID accordingly
	}

	if err := gh.DB.Create(&newGame).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create game"})
	}

	return c.JSON(newGame)
}

// GetGameByID retrieves a game by ID
func (gh *GameHandler) GetGameByID(c *fiber.Ctx) error {
	gameID := c.Params("id")
	var game models.Game

	if err := gh.DB.Preload("User").First(&game, gameID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Game not found"})
	}

	return c.JSON(game)
}

// UpdateGame updates game information
func (gh *GameHandler) UpdateGame(c *fiber.Ctx) error {
	gameID := c.Params("id")
	var game models.Game

	if err := gh.DB.First(&game, gameID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Game not found"})
	}

	updatedGame := models.Game{} // Define struct for updated game

	if err := c.BodyParser(&updatedGame); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	gh.DB.Model(&game).Updates(updatedGame)

	return c.JSON(game)
}

// DeleteGame deletes a game by ID
func (gh *GameHandler) DeleteGame(c *fiber.Ctx) error {
	gameID := c.Params("id")
	var game models.Game

	if err := gh.DB.First(&game, gameID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Game not found"})
	}

	gh.DB.Delete(&game)

	return c.SendStatus(fiber.StatusNoContent)
}

// NewGameHandler initializes a new GameHandler with the provided database instance
func NewGameHandler(db *gorm.DB) *GameHandler {
	return &GameHandler{DB: db}
}

// Get all games
func (gh *GameHandler) GetGames(c *fiber.Ctx) error {
	var games []models.Game

	if err := gh.DB.Preload("User").Find(&games).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Games not found"})
	}

	return c.JSON(games)
}
