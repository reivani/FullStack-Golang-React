package structs

type SuccessResponse struct {
	Success bool   `json:"success"`   // menyimpan nilai true dan false sebagai indikator suksesnya suatu proses
	Message string `json:"message"`   // untuk memberikan pesan yang menjelaskan hasil dari proses
	Data    any    `json:"data"`      // tipe data any memungkinkan kita mengisi field dengan tipe data apapun
}

type ErrorResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Errors  any    `json:"errors,omitempty"`
}