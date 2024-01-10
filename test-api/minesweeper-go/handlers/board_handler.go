// board_handler.go
package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nascarsayan/minesweeper-go/models"
	"gorm.io/gorm"
)

// BoardHandler contains the database instance
type BoardHandler struct {
	DB *gorm.DB
}

// CreateBoardDto represents the DTO for creating a board
type CreateBoardDto struct {
	Width      int `json:"width"`
	Height     int `json:"height"`
	Difficulty int `json:"difficulty"`
}

// CreateBoard creates a new board
func (bh *BoardHandler) CreateBoard(c *fiber.Ctx) error {
	var createBoardDto CreateBoardDto

	if err := c.BodyParser(&createBoardDto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	newBoard := models.Board{
		Width:      createBoardDto.Width,
		Height:     createBoardDto.Height,
		Difficulty: createBoardDto.Difficulty,
	}

	if err := bh.DB.Create(&newBoard).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create board"})
	}

	return c.JSON(newBoard)
}

// GetBoardByID retrieves a board by ID
func (bh *BoardHandler) GetBoardByID(c *fiber.Ctx) error {
	boardID := c.Params("id")
	var board models.Board

	if err := bh.DB.First(&board, boardID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Board not found"})
	}

	return c.JSON(board)
}

// UpdateBoard updates board information
func (bh *BoardHandler) UpdateBoard(c *fiber.Ctx) error {
	boardID := c.Params("id")
	var board models.Board

	if err := bh.DB.First(&board, boardID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Board not found"})
	}

	updatedBoard := models.Board{} // Define struct for updated board

	if err := c.BodyParser(&updatedBoard); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	bh.DB.Model(&board).Updates(updatedBoard)

	return c.JSON(board)
}

// DeleteBoard deletes a board by ID
func (bh *BoardHandler) DeleteBoard(c *fiber.Ctx) error {
	boardID := c.Params("id")
	var board models.Board

	if err := bh.DB.First(&board, boardID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Board not found"})
	}

	bh.DB.Delete(&board)

	return c.SendStatus(fiber.StatusNoContent)
}

// NewBoardHandler initializes a new BoardHandler with the provided database instance
func NewBoardHandler(db *gorm.DB) *BoardHandler {
	return &BoardHandler{DB: db}
}
