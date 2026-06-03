import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TradesService {
  private http = inject(HttpClient);

  getTrades() {
    return this.http.get("http://localhost:3000/trades");
  }
}