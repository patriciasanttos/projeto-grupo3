import React from 'react';
import styles from './Styles.module.css';

// Import Icons
import btnClose from '../../assets/icons/btn-close.svg';
import clrHeart from '../../assets/icons/clr-heart.svg';
import noclrHeart from '../../assets/icons/noclr-heart.svg';
import noclrEnergy from '../../assets/icons/noclr-energy.svg';
import clrPawDog from '../../assets/icons/clr-pawdog.svg';
import noclrPawDog from '../../assets/icons/noclr-pawdog.svg';

// Import Images
import dog from '../../assets/images/hector.svg';


function Modal({ isOpen, setOpen, setModalOpen }) {

    if (isOpen) {
        return (

            <div className={styles.background}>

                <div className={styles.modal}>

                    <div className={styles.closeModal}>
                        <button onClick={setModalOpen}>
                            <img src={btnClose} alt={'button close'} />
                        </button>
                    </div>

                    <div className={styles.generalData}>

                        <div>
                            <h2 className={styles.animalName}>
                                Hector
                            </h2>
                            <div className={styles.status}>
                                <div>
                                    <p>
                                        <strong>Carinhoso</strong> <br />
                                        <img className={styles.icons} src={clrHeart} alt="" />
                                        <img className={styles.icons} src={clrHeart} alt="" />
                                        <img className={styles.icons} src={noclrHeart} alt="" />
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <strong>Energético</strong> <br />
                                        <img className={styles.icons} src={noclrEnergy} alt="" />
                                        <img className={styles.icons} src={noclrEnergy} alt="" />
                                        <img className={styles.icons} src={noclrEnergy} alt="" />
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <strong>Sociável</strong> <br />
                                        <img className={styles.icons} src={clrPawDog} alt="" />
                                        <img className={styles.icons} src={clrPawDog} alt="" />
                                        <img className={styles.icons} src={noclrPawDog} alt="" />
                                    </p>
                                </div>
                            </div>

                            <div className={styles.info}>
                                <p><strong>Sexo</strong>: Macho</p>
                                <p><strong>Peso aproximado</strong>: 15Kg</p>
                                <p><strong>Idade</strong>: 3 anos</p>
                                <p>Sem raça definida (SRD)</p>
                            </div>
                        </div>
                        <img className={styles.animal} src={dog} alt="animal image" />

                    </div>

                    <div className={styles.history}>
                        <h3>História</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Accusantium minima natus commodi error, ad delectus harum
                            possimus laboriosam culpa cumque quo quis, iusto, consectetur
                            voluptate numquam quos nemo dolores. Tenetur! Lorem ipsum dolor
                            Accusantium minima natus commodi error, ad delectus harum
                            possimus laboriosam culpa cumque quo quis, iusto, consectetur
                            voluptate numquam quos nemo dolores. Tenetur!
                        </p>
                    </div>

                    <div className={styles.containerForm}>
                        <div className={styles.forms}>
                            <h2>Preencha o formulário</h2>
                            <form action="" method=''>
                                <input type="text" placeholder='Nome Completo *' aria-label="Nome Completo" required />
                                <input type="text" placeholder='Endereço Completo *' aria-label="Endereço Completo" required />
                                <input type="email" placeholder='E-mail *' aria-label="E-mail" required />
                                <input type="text" placeholder='Celular *' aria-label="Celular" required />
                            </form>
                        </div>

                        <div className={styles.terms}>
                            <h2>Termo de apadrinhamento</h2>
                        </div>
                    </div>

                    <div className={styles.btnSubmit}>
                        <button type="submit">Quero apadrinhar</button>
                    </div>

                </div>
            </div>

        )

    }

    return null
}

export default Modal;