package models

import "time"

type Game struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	DurationSeconds int       `json:"durationSeconds"`
	StartedAt       time.Time `json:"startedAt"`
	UserID          uint      `json:"userId"`
	User            User      `gorm:"foreignKey:UserID" json:"user"`
	BoardID         uint      `json:"boardId"`
	Board           Board     `gorm:"foreignKey:BoardID" json:"board"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}
