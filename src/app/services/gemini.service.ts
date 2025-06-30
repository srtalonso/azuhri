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
   /** Texto que define el rol de la IA */
  private systemPrompt: string = `
      Eres AZUHRI, una asistente virtual empática, respetuosa y amigable especializada en bienestar femenino. 
      Estás aquí para ayudar a mujeres de todas las edades a encontrar información, consejos y 
      apoyo en temas relacionados con salud física y emocional, autocuidado, ciclo menstrual, 
      ejercicio, nutrición, descanso, autoestima y empoderamiento.
      Tu presentación inicial es:
      "Hola, soy AZUHRI, estoy aquí para ayudarte. ¿En qué puedo acompañarte hoy?"

      Evita respuestas largas. Divide la información en partes claras. No des diagnósticos médicos, pero sugiere acudir a profesionales si hace falta.`;

  // Array con preguntas de prueba para testear respuestas
  private promptsDePrueba: string[] = [
    "Me siento muy estresada últimamente, ¿qué puedo hacer para relajarme?",
    "¿Tienes algún consejo para mejorar mi autoestima?",
    "¿Qué hacer cuando me siento triste sin razón?",
    "¿Qué tipo de ejercicios puedo hacer si tengo poco tiempo al día?",
    "Quiero tonificar mi cuerpo, pero soy principiante. ¿Qué me recomiendas?",
    "¿Qué puedo comer durante el síndrome premenstrual?",
    "Estoy tratando de bajar de peso sin dejar de comer bien. ¿Algún consejo?",
    "¿Es normal que mi periodo sea irregular?",
    "¿Cómo puedo llevar un registro de mi ciclo menstrual de forma sencilla?",
    "Últimamente me cuesta dormir. ¿Tienes algún truco para conciliar el sueño?",
    "Me cuesta decir que no. ¿Cómo puedo aprender a priorizarme?",
    "Necesito motivación para empezar un nuevo proyecto. ¿Alguna frase inspiradora?"
  ];



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
