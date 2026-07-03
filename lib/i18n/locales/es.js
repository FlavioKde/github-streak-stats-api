export default {
    labels: {
        'title': 'GitHub Streak Stats',
        'currentStreak': 'Actual',
        'longestStreak': 'Máxima',
        'totalContributions': 'Total' 
    },
    languagesLabels: {
        'languagesTitle': 'GitHub Language Stats',
        'totalLanguages': 'Total de Lenguajes',
        'totalBytes': 'Total de Bytes',
        'languages': 'Lenguajes'
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