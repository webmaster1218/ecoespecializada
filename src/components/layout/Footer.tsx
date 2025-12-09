export default function Footer() {
    return (
        <footer style={{
            background: '#1a1a1a',
            color: '#fff',
            padding: '60px 0 30px',
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', flexWrap: 'wrap', opacity: 0.6 }}>
                    {/* Logos Simulados en Texto por ahora */}
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>MINDRAY</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>INVIMA</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>EQUIBIOMEDIC</span>
                </div>

                <div style={{ borderTop: '1px solid #333', paddingTop: '30px', fontSize: '0.9rem', color: '#888' }}>
                    <p>© 2025 EcoAlquiler Colombia. Todos los derechos reservados.</p>
                    <p>Calle 123 # 45-67, Bogotá D.C. | Tel: (601) 000-0000</p>
                </div>
            </div>
        </footer>
    );
}
