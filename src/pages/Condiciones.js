import React, { Component } from 'react'
import {
    Container
} from 'semantic-ui-react'

import { Helmet } from "react-helmet";

export default class Condiciones extends Component {

    render() {
        return (
            <Container text>
                <Helmet>
                    <title>Términos y Condiciones de Uso | ViaDF</title>
                </Helmet>

               <h1>Términos y Condiciones de Uso</h1>
               <h2>Derechos de Propiedad Intelectual</h2>
               <p>Todos los derechos de propiedad intelectual con respecto al Contenido de la página web son de titularidad exclusiva de ViaDF.mx. Los nombres de productos, logotipos, marcas o el nombre de ViaDF que aparecen en esta página web son marcas registradas propias o licenciadas por viadf.mx. Queda estrictamente prohibido el uso o uso indebido de dichas marcas registradas o materiales con derechos de autor, excepto según lo indicado anteriormente.</p>
               <h2>Actividades prohibidas</h2>
               <p>Spamming - el envío de mensajes en gran volumen, comerciales o ambos, no solicitados, a través de Internet (conocidos como "Spamming"). Phishing - el diseño de páginas WEB idénticas a otras ya establecidas con el fin de conseguir o extraer información personal a terceros es penado por la ley. Esto igualmente aplica al envío de correos electrónicos que suplantan al emisor original. Acceso ilegal o no autorizado - es el acceso ilegal o sin autorización a computadoras, cuentas o redes pertenecientes a otra parte, o el intento de penetrar las medidas de seguridad del sistema de otro individuo (frecuentemente mencionado como "hacking"). También, cualquier actividad que podría usarse como precursora del intento de penetración de un sistema (es decir, exploración de puertos, exploración sigilosa u otra actividad de acopio de información).</p>
            </Container>
        );
    }
}