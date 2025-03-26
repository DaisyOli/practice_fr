import { Controller } from "@hotwired/stimulus"

// Controlador simples para lidar com a ação de clique no dropdown
export default class extends Controller {
  connect() {
    console.log("Dropdown controller connected")
  }
} 