let baseUrl;

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000"; // Development environment base URL
} else {
  baseUrl = "https://cfstress.azurewebsites.net"; // Production environment base URL
}

export default baseUrl;
