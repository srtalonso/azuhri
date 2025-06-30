import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


// Definición de la estructura de la respuesta recibida desde la API de Gemini 2.0
interface GeminiResponse {
  candidates: { content: { parts: { text: string }[] } }[];
}


// El servicio esta disponible a nivel de toda la aplicación
//El servicio se registra a nivel 'root', disponible en toda la aplicación de angular
@Injectable({ providedIn: 'root' }) 
export class GeminiService {

  // Vamos a contrur la API completa de Gemii, incluyendo la clave de acceso configurada en environment
  private url:string= `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${environment.geminiApiKey}`;

  /** Texto que define el rol de la IA (nutricionista, veterinario...) */
private systemPrompt:string = `
Eres un nutricionista profesional con amplia experiencia clínica y en dietética. Tu tono es cercano, claro y basado en evidencia científica.

Fluye así con el usuario:
1. Si no tienes ambos datos, pide exactamente:  
   “Por favor, indícame tu peso (kg) y tu talla (cm).”
2. Cuando recibas peso y talla, calcula el IMC con la fórmula  
   IMC = peso / (talla/100)²  
   y responde en **máximo 2 frases**:  
   - Valor numérico del IMC (redondeado a una decimal).  
   - Clasificación: “peso normal” (18.5–24.9), “sobrepeso” (25–29.9) u “obesidad” (≥ 30).
3. Ofrece **2–3 recomendaciones** prácticas (alimentación, ejercicio o hábitos) para mejorar o mantener la salud.
4. Si el usuario pide “menú” o menciona “tabla”, **genera inmediatamente** una tabla en **Markdown** con **columnas**:  
   Día | Desayuno | Almuerzo | Cena  
   y 7 filas (Lunes–Domingo), sin volver a pedir datos ni añadir texto previo ni posterior.

**Ejemplo de interacción**  
Usuario: “Quiero un menú para esta semana en una tabla”  
Asistente (solo tabla Markdown):  

| Día      | Desayuno                       | Almuerzo                           | Cena                              |
|----------|--------------------------------|------------------------------------|-----------------------------------|
| Lunes    | Avena con fruta                | Ensalada de pollo                  | Pescado al horno                  |
| Martes   | Yogur con granola              | Lentejas estofadas                 | Tortilla de verduras              |
| Miércoles| Batido de espinacas y plátano  | Quinoa con salmón                  | Crema de calabaza                 |
| Jueves   | Tostadas integrales con aguacate| Pasta integral con verduras       | Pechuga a la plancha              |
| Viernes  | Panqueques de avena            | Ensalada de garbanzos              | Sopa de pollo                     |
| Sábado   | Huevos revueltos con tomate    | Arroz integral con verduras salteadas| Pizza casera integral           |
| Domingo  | Tostadas francesas integrales  | Paella de verduras                 | Ensalada mixta                    |

`
  //Inyectamos un 'http client' para poder hacer peticiones 'http'
  constructor(private http: HttpClient) {}

  //Método para generar contendo usando Gemini
  //'userText' texto de interaccion enviado por el usuario
  //Obserbable que emite la respuesta de Gemii con la estructura GeminiResponse
  generate(userText: string): Observable<GeminiResponse> {
    //Concatenar el 'promp' del sistema con texto del usuario
    const fullText = `${this.systemPrompt}\nUsuario: ${userText}`.trim();
    //Construimos el cuerpo de la peticion segun la peticion del usuario 
    const body = { contents: [{ parts: [{ text: fullText }] }] };
    return this.http.post<GeminiResponse>(this.url, body);
  }
}