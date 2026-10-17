if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {

    // 0. MENÚ HAMBURGUESA
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 1. FILTROS MACRO DINÁMICOS
    const botonesMacro = document.querySelectorAll('.btn-filtro-macro');
    const gruposMacro = document.querySelectorAll('.grupo-macro');

    if (botonesMacro.length > 0 && gruposMacro.length > 0) {
        botonesMacro.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesMacro.forEach(b => b.classList.remove('activo'));
                boton.classList.add('activo');

                const target = boton.getAttribute('data-target');

                gruposMacro.forEach(grupo => {
                    if (grupo.id === 'seccion-' + target) {
                        grupo.style.display = 'block';
                    } else {
                        grupo.style.display = 'none';
                    }
                });
            });
        });

        const botonMacroActivo = document.querySelector('.btn-filtro-macro.activo');
        if (botonMacroActivo) {
            botonMacroActivo.click();
        }
    }

    // 2. FILTROS POR CATEGORÍA
    function configurarFiltros(selectorBotones, selectorTarjetas) {
        const botones = document.querySelectorAll(selectorBotones);
        const tarjetas = document.querySelectorAll(selectorTarjetas);

        if (botones.length > 0 && tarjetas.length > 0) {
            botones.forEach(btn => {
                btn.addEventListener('click', () => {
                    botones.forEach(b => b.classList.remove('activo'));
                    btn.classList.add('activo');

                    const categoriaFiltro = btn.getAttribute('data-filtro');

                    tarjetas.forEach(tarjeta => {
                        const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
                        if (categoriaFiltro === 'todos' || categoriaTarjeta === categoriaFiltro) {
                            tarjeta.style.display = 'block';
                        } else {
                            tarjeta.style.display = 'none';
                        }
                    });
                });
            });
        }
    }

    configurarFiltros('.btn-filtro-ataud', '.tarjeta-catalogo');
    configurarFiltros('.btn-filtro-cremacion', '.tarjeta-cremacion');

    // CARRUSEL DE INSTALACIONES
    const trackInstalaciones = document.querySelector('.items-instalacion-track');
    const itemsInstalacion = document.querySelectorAll('.item-instalacion');
    const btnInstPrev = document.querySelector('.btn-inst-prev');
    const btnInstNext = document.querySelector('.btn-inst-next');

    if (trackInstalaciones && itemsInstalacion.length > 0) {
        let indiceInstalacion = 0;
        const totalInstalaciones = itemsInstalacion.length;

        const actualizarCarruselInstalaciones = () => {
            trackInstalaciones.style.transform = `translateX(-${indiceInstalacion * 100}%)`;
        };

        if (btnInstNext) {
            btnInstNext.addEventListener('click', (e) => {
                e.stopPropagation();
                indiceInstalacion = (indiceInstalacion + 1) % totalInstalaciones;
                actualizarCarruselInstalaciones();
            });
        }

        if (btnInstPrev) {
            btnInstPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                indiceInstalacion = (indiceInstalacion - 1 + totalInstalaciones) % totalInstalaciones;
                actualizarCarruselInstalaciones();
            });
        }
    }

    // CARRUSEL DE GAMA BAJA
    const trackGamaBaja = document.querySelector('.items-gamabaja-track');
    const itemsGamaBaja = document.querySelectorAll('.item-gamabaja');
    const btnGbPrev = document.querySelector('.btn-gb-prev');
    const btnGbNext = document.querySelector('.btn-gb-next');

    if (trackGamaBaja && itemsGamaBaja.length > 0) {
        let indiceGamaBaja = 0;
        const totalGamaBaja = itemsGamaBaja.length;

        const actualizarCarruselGamaBaja = () => {
            trackGamaBaja.style.transform = `translateX(-${indiceGamaBaja * 100}%)`;
        };

        if (btnGbNext) {
            btnGbNext.addEventListener('click', (e) => {
                e.stopPropagation();
                indiceGamaBaja = (indiceGamaBaja + 1) % totalGamaBaja;
                actualizarCarruselGamaBaja();
            });
        }

        if (btnGbPrev) {
            btnGbPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                indiceGamaBaja = (indiceGamaBaja - 1 + totalGamaBaja) % totalGamaBaja;
                actualizarCarruselGamaBaja();
            });
        }
    }

    // CARRUSEL DE GAMA MEDIA (10 MODELOS)
    const trackGamaMedia = document.querySelector('.items-gamamedia-track');
    const itemsGamaMedia = document.querySelectorAll('.item-gamamedia');
    const btnGmPrev = document.querySelector('.btn-gm-prev');
    const btnGmNext = document.querySelector('.btn-gm-next');

    if (trackGamaMedia && itemsGamaMedia.length > 0) {
        let indiceGamaMedia = 0;
        const totalGamaMedia = itemsGamaMedia.length;

        const actualizarCarruselGamaMedia = () => {
            trackGamaMedia.style.transform = `translateX(-${indiceGamaMedia * 100}%)`;
        };

        if (btnGmNext) {
            btnGmNext.addEventListener('click', (e) => {
                e.stopPropagation();
                indiceGamaMedia = (indiceGamaMedia + 1) % totalGamaMedia;
                actualizarCarruselGamaMedia();
            });
        }

        if (btnGmPrev) {
            btnGmPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                indiceGamaMedia = (indiceGamaMedia - 1 + totalGamaMedia) % totalGamaMedia;
                actualizarCarruselGamaMedia();
            });
        }
    }

    // 4. LIGHTBOX / ZOOM DE IMÁGENES
    const modalLightbox = document.getElementById('modalLightbox');
    const modalZoomContainer = document.getElementById('modalZoomContainer');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const imagenesParaZoom = document.querySelectorAll('.carrusel-img');
    const modalIndicadores = document.getElementById('modalIndicadores');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    if (modalLightbox && modalZoomContainer) {
        let galeriaActual = [];
        let indiceActual = 0;
        let modalTrack = null;
        let slideImgs = [];

        let escala = 1;
        let posX = 0;
        let posY = 0;
        let arrastrando = false;
        let inicioX = 0;
        let inicioY = 0;
        let downX = 0;
        let downY = 0;
        let isDragging = false;

        function actualizarTransformacionActiva() {
            if (slideImgs[indiceActual]) {
                slideImgs[indiceActual].style.transform = `translate(${posX}px, ${posY}px) scale(${escala})`;
                slideImgs[indiceActual].style.cursor = escala > 1 ? 'grab' : 'zoom-in';
            }
        }

        function resetZoom() {
            escala = 1;
            posX = 0;
            posY = 0;
            slideImgs.forEach(img => {
                if (img) {
                    img.style.transform = 'translate(0px, 0px) scale(1)';
                    img.style.cursor = 'zoom-in';
                }
            });
        }

        function actualizarImagenModal() {
            if (!modalTrack) return;
            resetZoom();
            modalTrack.style.transform = `translateX(-${indiceActual * 100}%)`;

            if (modalPrev && modalNext) {
                modalPrev.style.display = galeriaActual.length > 1 ? 'block' : 'none';
                modalNext.style.display = galeriaActual.length > 1 ? 'block' : 'none';
            }

            if (modalIndicadores) {
                modalIndicadores.innerHTML = '';
                if (galeriaActual.length > 1) {
                    galeriaActual.forEach((_, idx) => {
                        const punto = document.createElement('div');
                        punto.style.width = '10px';
                        punto.style.height = '10px';
                        punto.style.borderRadius = '50%';
                        punto.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
                        punto.style.backgroundColor = idx === indiceActual ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)';
                        punto.style.transform = idx === indiceActual ? 'scale(1.2)' : 'scale(1)';
                        modalIndicadores.appendChild(punto);
                    });
                }
            }
        }

        imagenesParaZoom.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault(); 
                const dataGaleria = this.getAttribute('data-galeria');
                galeriaActual = dataGaleria ? dataGaleria.split(',').map(url => url.trim()) : [this.src];
                
                indiceActual = 0;
                for (let i = 0; i < galeriaActual.length; i++) {
                    if (this.src.includes(galeriaActual[i]) || galeriaActual[i].includes(this.getAttribute('src'))) {
                        indiceActual = i;
                        break;
                    }
                }

                modalZoomContainer.innerHTML = '';
                modalZoomContainer.style.overflow = 'hidden';

                modalTrack = document.createElement('div');
                modalTrack.style.cssText = 'display: flex; transition: transform 0.35s ease-in-out; width: 100%; height: 100%; pointer-events: auto;';

                slideImgs = [];

                galeriaActual.forEach(urlImg => {
                    const slideDiv = document.createElement('div');
                    slideDiv.style.cssText = 'min-width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-sizing: border-box;';

                    const slideImg = document.createElement('img');
                    slideImg.src = urlImg;
                    slideImg.alt = 'Imagen ampliada';
                    slideImg.style.cssText = 'max-width: 85%; max-height: 76%; object-fit: contain; user-select: none; pointer-events: auto; cursor: zoom-in; transition: transform 0.15s ease-out; transform-origin: center;';

                    slideImg.addEventListener('mousedown', (ev) => {
                        if (ev.button !== 0) return;
                        ev.preventDefault();
                        downX = ev.clientX;
                        downY = ev.clientY;
                        inicioX = ev.clientX - posX;
                        inicioY = ev.clientY - posY;
                        isDragging = false;
                    });

                    slideImg.addEventListener('click', (ev) => {
                        ev.stopPropagation();
                        const dist = Math.hypot(ev.clientX - downX, ev.clientY - downY);
                        if (isDragging || dist > 5) return;

                        escala = escala === 1 ? 2.5 : 1;
                        if (escala === 1) { posX = 0; posY = 0; }
                        actualizarTransformacionActiva();
                    });

                    slideDiv.appendChild(slideImg);
                    modalTrack.appendChild(slideDiv);
                    slideImgs.push(slideImg);
                });

                modalZoomContainer.appendChild(modalTrack);
                actualizarImagenModal();
                modalLightbox.style.display = 'flex'; 
                document.body.style.overflow = 'hidden';
            });
        });

        window.addEventListener('mousemove', (e) => {
            if (modalLightbox.style.display !== 'flex') return;
            if (e.buttons === 0) { arrastrando = false; return; }
            const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
            if (dist > 5) {
                isDragging = true;
                if (escala > 1) {
                    arrastrando = true;
                    posX = e.clientX - inicioX;
                    posY = e.clientY - inicioY;
                    actualizarTransformacionActiva();
                    if (slideImgs[indiceActual]) slideImgs[indiceActual].style.cursor = 'grabbing';
                }
            }
        });

        window.addEventListener('mouseup', () => {
            if (arrastrando) {
                arrastrando = false;
                if (escala > 1 && slideImgs[indiceActual]) slideImgs[indiceActual].style.cursor = 'grab';
            }
        });

        if (modalPrev) {
            modalPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                if (galeriaActual.length > 1) {
                    indiceActual = (indiceActual - 1 + galeriaActual.length) % galeriaActual.length;
                    actualizarImagenModal();
                }
            });
        }

        if (modalNext) {
            modalNext.addEventListener('click', (e) => {
                e.stopPropagation();
                if (galeriaActual.length > 1) {
                    indiceActual = (indiceActual + 1) % galeriaActual.length;
                    actualizarImagenModal();
                }
            });
        }

        const cerrarModalFunc = () => {
            modalLightbox.style.display = 'none';
            document.body.style.overflow = '';
            modalZoomContainer.innerHTML = '';
            modalTrack = null;
            slideImgs = [];
            resetZoom();
            if (modalIndicadores) modalIndicadores.innerHTML = '';
        };

        if (cerrarModal) {
            cerrarModal.addEventListener('click', cerrarModalFunc);
        }

        modalLightbox.addEventListener('click', (e) => {
            if (e.target === modalLightbox) cerrarModalFunc();
        });

        window.addEventListener('keydown', (e) => {
            if (modalLightbox.style.display === 'flex') {
                if (e.key === 'Escape') cerrarModalFunc();
                if (e.key === 'ArrowLeft' && modalPrev) modalPrev.click();
                if (e.key === 'ArrowRight' && modalNext) modalNext.click();
            }
        });
    }

    // 5. VIDEO DE FONDO
    const videoFondo = document.getElementById('videoFondo');
    const videoFondoBlur = document.getElementById('videoFondoBlur');
    const btnSonido = document.getElementById('btnSonido');

    if (videoFondo) {
        videoFondo.muted = true;
        videoFondo.play().catch(() => {});
        if (videoFondoBlur) {
            videoFondoBlur.muted = true;
            videoFondoBlur.play().catch(() => {});
        }

        if (btnSonido) {
            btnSonido.addEventListener('click', () => {
                if (videoFondo.muted) {
                    videoFondo.muted = false;
                    videoFondo.play();
                    if (videoFondoBlur) videoFondoBlur.play();
                    btnSonido.textContent = '🔊';
                } else {
                    videoFondo.muted = true;
                    btnSonido.textContent = '🔇';
                }
            });
        }
    }

    // 6. COPIAR AL PORTAPAPELES
    document.querySelectorAll('.elemento-copiable').forEach(elemento => {
        elemento.addEventListener('click', () => {
            const textoACopiar = elemento.getAttribute('data-valor');
            navigator.clipboard.writeText(textoACopiar).then(() => {
                const aviso = document.createElement('div');
                aviso.textContent = '¡Copiado al portapapeles!';
                aviso.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; z-index: 10000; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.3);';
                document.body.appendChild(aviso);
                setTimeout(() => aviso.remove(), 2000);
            });
        });
    });
});