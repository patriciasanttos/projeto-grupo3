import React from 'react';

import NavBar from '../../../components/navbar/NavBar';
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';

import './donation.css';
import DonationCard from '../../../components/card_donation/DonationCard';
import ContentHero from '../../../components/contentHero/ContentHero';

import qrcode from '../../../assets/images/qrcode.svg'
import pagseguro from '../../../assets/images/pagseguro.svg'
import paypal from '../../../assets/images/paypal.svg'
import picpay from '../../../assets/images/picpay.svg'


// import { Container } from './styles';

function Donation() {
  return (
    <div className='page_container'>
      <NavBar />

      <ContentHero
        subtitle="Faça a diferença na vida de um animal" 
        title="Faça uma doação" 
        text="Nossa ONG se dedica incansavelmente a cuidar desses animais, proporcionando alimentação, abrigo, cuidados veterinários e, acima de tudo, muito amor. Mas para continuarmos com esse trabalho, precisamos de você. Sua doação, por menor que seja, faz uma diferença imensa na vida desses animais."
        text2="Junte-se a nós nessa missão. Doe agora e ajude a transformar a vida de um animal abandonado. Eles contam com você!"
      />

      <section className="section-information">
          <div className='cards-donation'>

          <h3 className="call-title">FAÇA A DIFERENÇA NA VIDA DE UM ANIMAL</h3>
          <h1 className="call-subtitle"> Faça uma doação </h1>

            <DonationCard/>

          <div className="ways-to-donate">
            <div className="left">
              <h3>Retirada de Doações</h3>
              <p>Explicar como pode entrar em contato <br/> 
              para a retirada de doações de rações,<br/> 
              remédios e outros itens. <br/><br/>

              Ou você deixar doações com nossos parceiros:</p>
              <ul>
                <li> <a href="https://g.co/kgs/a9EAibt"> Arca Petstore - Bandeirantes </a></li>
                <li> <a href="https://g.co/kgs/EG2S4f6"> Arca Petstore - Santa Terezinha </a></li>
                <li> <a href="https://g.co/kgs/wxo1zJQ">Agropecuária Calé </a></li>
                <li> <a href="https://maps.app.goo.gl/1xcogVdo4fr3R142A"> Toca dos Bichos </a></li>
                <li> <a href="https://g.co/kgs/BWLZPxE">Agrotela</a></li>
                <li> <a href="https://g.co/kgs/dDhNDuV">Veterinária Juiz de Fora</a></li>
                <li> <a href="https://g.co/kgs/cdnjZzi"> Cão Dágua</a></li>
                <li> <a href="https://www.google.com/search?rlz=1C1GCEA_enBR1114BR1114&sca_esv=5629ad944f1312b7&cs=0&output=search&tbm=lcl&kgmid=%2Fg%2F11gfd30tqh&q=Benrural&shndl=30&shem=lrnole%2Clsde%2Cvslcca&source=sh%2Fx%2Floc%2Fact%2Fm1%2F1&kgs=d4c7ff74c1f4c91f">Pet Shop BenRural </a></li>
                
              </ul>
              <br/>
              <h3>Outras formas de ajudar:</h3>
              <p>Cada feira de adoção tem custo hoje de <br/> 
              R$ 1.500,00 a R$ 2.000,00, pois há gastos com<br/> 
              banho nos animais, transporte e funcionários.<br/>
              Caso você tenha um bom espaço de feiras <br/>
              para nos sugerir, mande um e-mail para: <br/>
              ladynegaomimosa@gmail.com</p>
            </div>


            <div className="right">
              <h3>Pix</h3>
                <img src={qrcode} alt="qrcode" />
                <p>CNPJ:  20.460. 556/0001-78</p> <br/>

                <h3>Depósito ou Transferência:</h3>
                <h4>Banco do Brasil</h4>
                <p>Conta corrente<br/>
                    Agência: 3139-9<br/>
                    Conta: 22534-7</p>

                <h4>Caixa Econôica</h4>
                <p>Conta poupança<br/>
                  Agência: 1641<br/>
                  Conta: 2397-6<br/>
                  Operação: 003</p>

                <h4>Bradesco</h4>
                <p>Conta corrente<br/>
                  Agência: 3832<br/>
                  Conta: 161081-3</p>

              </div>
          </div>
          </div>
          <div className="text-call-platform">
          <h3>Doe pelas Plataformas Digitais:</h3>
          </div>
          <div className="digital-platform">

              <a href="https://pagseguro.uol.com.br/">
              <img src={pagseguro} alt="pagseguro" />
              </a>

              <a href="https://www.paypal.com/br/home">
              <img src={paypal} alt="paypal" />
              </a>

              <a href="https://picpay.com/">
              <img src={picpay} alt="picpay" />
              </a>

          </div>
      </section>

      <Menu currentPage='donation' />
      <Footer />
    </div>
  );
}

export default Donation;