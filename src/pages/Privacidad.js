import React, { Component } from 'react'
import {
    Container
} from 'semantic-ui-react'

import { Helmet } from "react-helmet";

export default class Privacidad extends Component {

    render() {
        return (
            <Container text>
                <Helmet>
                    <title>Políticas de Privacidad | ViaDF</title>
                </Helmet>
                <h1>Políticas de Privacidad</h1>
                <h2>Datos de identificación personal</h2>
                <p>
                    ViaDF.mx no recopila datos de identificación personal sobre los individuos excepto cuando los individuos suministran dicha información voluntariamente, al enviar correo electrónico u otra comunicación dirigida a ViaDF.mx o a través de ViaDF.mx. ViaDF.mx mantendrá mecanismos de protección adecuados, y que se adhieran a las normas de la industria, para garantizar la seguridad, integridad y privacidad de la información recopilada de los usuarios de ViaDF.mx. Los datos de identificación personal recopilados por ViaDF.mx o en ViaDF.mx no se venderán ni serán suministrados a terceros sin el consentimiento del usuario. A pesar de lo anterior, a los usuarios de ViaDF.mx se les informa que ViaDF.mx recopila datos estadísticos acumulativos sobre los visitantes, y que dichos datos pueden usarse para realizar investigaciones de mercado y otras actividades. Además, es posible que ViaDF.mx comparta los datos acumulativos y anónimos con socios promocionales, empresariales o publicitarios. Sin incluir alguna petición que haga un usuario para "no participar" en la recepción de información promocional, ViaDF.mx se reserva el derecho de comunicarse con un afiliado sobre el estado de su cuenta, cambios en el acuerdo del afiliado y otros asuntos pertinentes al sitio ViaDF.mx y/o la información suministrada por un usuario.
                </p>
                <h2>Divulgación de información</h2>
                <p>
                    A pesar de su política general de no divulgar los datos de identificación personal a terceros, es posible que ViaDF.mx divulgue dicha información: (a) cuando ViaDF.mx tiene motivos para creer que la divulgación de dicha información es necesaria para identificar, comunicarse con, o emprender una acción legal en contra de alguien que pudiera estar perjudicando u obstaculizando (bien sea intencionalmente o no) los derechos o la propiedad de ViaDF.mx, otros usuarios de ViaDF.mx, o algún tercero; (b) según sea necesario para hacer respetar y cumplir los Términos y condiciones de uso de ViaDF.mx; (c) según lo requiera la ley; o (d) según lo indicado de otra manera por ViaDF en el sitio ViaDF.mx.
                </p>
                <h2>El uso de cookies</h2>
                <p>Es posible que este sitio use cookies en conexión con ciertas características o funciones. Los archivos cookies son tipos específicos de información que un sitio web transmite al disco duro de la computadora de un usuario con el fin de mantener registros. Los cookies pueden servir para facilitar el uso de un sitio web, por ejemplo, al guardar contraseñas y preferencias mientras el usuario visita el sitio. ViaDF.mx no usa cookies para obtener datos de identificación personal de la computadora de un usuario que no se hayan enviado originalmente como parte del cookie. Aunque la mayoría de los navegadores aceptan cookies automáticamente, usted puede configurar su navegador para que no los acepte. Existe la posibilidad de que ViaDF.mx permita que otras empresas que presentan anuncios u otras funciones en ViaDF.mx obtengan acceso a los cookies en su computadora. ViaDF.mx no controla la política de cookies de otras empresas.</p>
                <h2>Enlaces</h2>
                <p>ViaDF.mx podría contener enlaces a otros sitios web. ViaDF.mx no puede controlar las políticas de privacidad de otros sitios ni es responsable por éstas. ViaDF.mx recomienda que los usuarios estén conscientes de ésto cuando salgan de ViaDF.mx, y lean las declaraciones de privacidad en cada sitio web que visitan. Dicha política de privacidad se aplica sólo a la información recopilada por ViaDF.mx.</p>
                <h2>Aceptación de la política</h2>
                <p>Al usar el sitio ViaDF.mx, usted indica que acepta esta Política de privacidad. Si no acepta esta Política, no utilice el sitio ViaDF.mx. Su uso continuo de ViaDF.mx implica que usted acepta esta Política y cualquier modificación de la misma. ViaDF.mx se reserva el derecho de cambiar esta Política en cualquier momento. Esta Política no crea ningún derecho legal o contractual, ni pretende hacerlo, en nombre de ninguna institución ni en beneficio de ninguna institución.</p>
                <h2>Notificación de cambios en la política</h2>
                <p>Si ViaDF.mx cambia esta Política de privacidad, dichos cambios aparecerán en el sitio web ViaDF.mx para que los usuarios se enteren de los datos recopilados por ViaDF.mx, la forma en que dichos datos se usan, y en qué circunstancias, si las hubiere, se puede divulgar la información. Si usted tiene alguna pregunta o duda relacionada con esta declaración de privacidad, por favor comuníquese con ViaDF.mx usando el formulario de contacto.</p>
            </Container>
        );
    }
}