package handlers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/nascarsayan/minesweeper-go/models"
	"gorm.io/gorm"
)

// UserHandler contains the database instance
type UserHandler struct {
	DB *gorm.DB
}

// GetUserByID retrieves a user by ID
func (uh *UserHandler) GetUserByID(c *fiber.Ctx) error {
	userID := c.Params("id")
	var user models.User

	if err := uh.DB.First(&user, userID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(user)
}

// Get user by username
func (uh *UserHandler) GetUserByUsername(c *fiber.Ctx) error {
	username := c.Params("username")
	var user models.User

	if err := uh.DB.Where("username = ?", username).First(&user).Error; err != nil {
		// log error
		fmt.Println(err)
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(user)
}

// CreateUser creates a new user
func (uh *UserHandler) CreateUser(c *fiber.Ctx) error {
	var newUser models.User

	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// Check for duplicate username
	var existingUser models.User
	if err := uh.DB.Where("username = ?", newUser.Username).First(&existingUser).Error; err != gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Username already exists"})
	}

	if err := uh.DB.Create(&newUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create user"})
	}

	return c.JSON(newUser)
}

// UpdateUser updates user information
func (uh *UserHandler) UpdateUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	var user models.User

	if err := uh.DB.First(&user, userID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}

	updatedUser := models.User{} // Define struct for updated user

	if err := c.BodyParser(&updatedUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	uh.DB.Model(&user).Updates(updatedUser)

	return c.JSON(user)
}

// DeleteUser deletes a user by ID
func (uh *UserHandler) DeleteUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	var user models.User

	if err := uh.DB.First(&user, userID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}

	uh.DB.Delete(&user)

	return c.SendStatus(fiber.StatusNoContent)
}

// NewUserHandler initializes a new UserHandler with the provided database instance
func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{DB: db}
}
