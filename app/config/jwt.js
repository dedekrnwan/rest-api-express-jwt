export default {
    secretKey: 'NpYBWYa2I3sS7',
    signOptions: {
        issuer:  'Fractal',
        subject:  'noreply@fractal.com',
        audience:  'http://localhost/',
        expiresIn:  "12h",
        algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
    }
}