export default {
    labels: {
        'title': 'GitHub Streak Stats',
        'current': 'Actual',
        'longest': 'Máxima',
        'total': 'Total' 
    },
    errors: {
        ConfigurationError:
            "El token de GitHub no está configurado. Define la variable de entorno GITHUB_TOKEN.",

        GithubApiError:
            "La solicitud a la API de GitHub falló.",

        NotFoundError:
            "Usuario de GitHub no encontrado.",

        ValidationError:
            "Se requiere un nombre de usuario para obtener contribuciones de GitHub.",

        UnknownError:
            "Error inesperado."
    }
    };