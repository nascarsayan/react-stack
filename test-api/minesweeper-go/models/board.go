package models

import "time"

type Board struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Width      int       `json:"width"`
	Height     int       `json:"height"`
	Difficulty int       `json:"difficulty"`
	Games      []Game    `gorm:"foreignKey:BoardID" json:"games"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}
