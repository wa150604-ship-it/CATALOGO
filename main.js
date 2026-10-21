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

    // 2. FILTROS POR CATEGORÍA (ATAÚDES Y URNAS)
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

    configurarFiltros('.btn-filtro-ataud', '.seccion-ataud-item');
    configurarFiltros('.btn-filtro-cremacion', '.item-urna-slide');

    // 3. FUNCIÓN PARA CARRUSELES CON PUNTOS INDICADORES INTERACTIVOS Y SWIPE
    function inicializarCarruselConPuntos(track, items, btnPrev, btnNext, contenedorIndicadores) {
        if (!track || items.length === 0) return;

        let indice = 0;
        const total = items.length;
        const indicadoresContainer = document.getElementById(contenedorIndicadores);

        const actualizarCarrusel = () => {
            track.style.transform = `translateX(-${indice * 100}%)`;
            if (puntos.length > 0) {
                puntos.forEach((p, idx) => {
                    if (idx === indice) {
                        p.classList.add('activo');
                        p.style.transform = 'scale(1.2)';
                        p.style.backgroundColor = '#ffffff';
                    } else {
                        p.classList.remove('activo');
                        p.style.transform = 'scale(1)';
                        p.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                    }
                });
            }
        };

        if (indicadoresContainer) {
            indicadoresContainer.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const punto = document.createElement('div');
                punto.classList.add('punto');
                if (i === 0) punto.classList.add('activo');
                
                // Permitir clic o toque directo en cada círculo del contador
                punto.addEventListener('click', (e) => {
                    e.stopPropagation();
                    indice = i;
                    actualizarCarrusel();
                });
                
                indicadoresContainer.appendChild(punto);
            }
        }

        const puntos = indicadoresContainer ? indicadoresContainer.querySelectorAll('.punto') : [];

        if (btnNext) {
            btnNext.addEventListener('click', (e) => {
                e.stopPropagation();
                indice = (indice + 1) % total;
                actualizarCarrusel();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                indice = (indice - 1 + total) % total;
                actualizarCarrusel();
            });
        }

        // Soporte de deslizamiento con el dedo (Swipe táctil en el carrusel)
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const umbral = 50;
            if (touchEndX < touchStartX - umbral) {
                indice = (indice + 1) % total;
                actualizarCarrusel();
            }
            if (touchEndX > touchStartX + umbral) {
                indice = (indice - 1 + total) % total;
                actualizarCarrusel();
            }
        }, { passive: true });
    }

    // APLICAR A LOS CARRUSELES PRINCIPALES
    inicializarCarruselConPuntos(
        document.querySelector('.items-instalacion-track'),
        document.querySelectorAll('.item-instalacion'),
        document.querySelector('.btn-inst-prev'),
        document.querySelector('.btn-inst-next'),
        'indicadores-instalaciones'
    );

    inicializarCarruselConPuntos(
        document.querySelector('.items-gamabaja-track'),
        document.querySelectorAll('.item-gamabaja'),
        document.querySelector('.btn-gb-prev'),
        document.querySelector('.btn-gb-next'),
        'indicadores-gamabaja'
    );

    inicializarCarruselConPuntos(
        document.querySelector('.items-gamamedia-track'),
        document.querySelectorAll('.item-gamamedia'),
        document.querySelector('.btn-gm-prev'),
        document.querySelector('.btn-gm-next'),
        'indicadores-gamamedia'
    );

    inicializarCarruselConPuntos(
        document.querySelector('.items-gamaalta-track'),
        document.querySelectorAll('.item-gamaalta'),
        document.querySelector('.btn-ga-prev'),
        document.querySelector('.btn-ga-next'),
        'indicadores-gamaalta'
    );

    inicializarCarruselConPuntos(
        document.querySelector('.items-tallaspequenas-track'),
        document.querySelectorAll('.item-tallaspequenas'),
        document.querySelector('.btn-tp-prev'),
        document.querySelector('.btn-tp-next'),
        'indicadores-tallaspequenas'
    );

    inicializarCarruselConPuntos(
        document.querySelector('.items-tallasgrandes-track'),
        document.querySelectorAll('.item-tallasgrandes'),
        document.querySelector('.btn-tg-prev'),
        document.querySelector('.btn-tg-next'),
        'indicadores-tallasgrandes'
    );

    // CARRUSEL DE URNAS
    inicializarCarruselConPuntos(
        document.querySelector('.items-urnas-track'),
        document.querySelectorAll('.item-urna-slide'),
        document.querySelector('.btn-urnas-prev'),
        document.querySelector('.btn-urnas-next'),
        'indicadores-urnas'
    );

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

        let touchZoomStartX = 0;
        let touchZoomStartY = 0;

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

                    // Control Mouse Desktop
                    slideImg.addEventListener('mousedown', (ev) => {
                        if (ev.button !== 0) return;
                        ev.preventDefault();
                        downX = ev.clientX;
                        downY = ev.clientY;
                        inicioX = ev.clientX - posX;
                        inicioY = ev.clientY - posY;
                        isDragging = false;
                    });

                    // Control Táctil Móvil para Paneo / Zoom
                    slideImg.addEventListener('touchstart', (ev) => {
                        if (escala > 1 && ev.touches.length === 1) {
                            touchZoomStartX = ev.touches[0].clientX - posX;
                            touchZoomStartY = ev.touches[0].clientY - posY;
                        }
                    }, { passive: true });

                    slideImg.addEventListener('touchmove', (ev) => {
                        if (escala > 1 && ev.touches.length === 1) {
                            posX = ev.touches[0].clientX - touchZoomStartX;
                            posY = ev.touches[0].clientY - touchZoomStartY;
                            actualizarTransformacionActiva();
                        }
                    }, { passive: true });

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

    // 5. VIDEO DE FONDO Y CONTROLES
    const videoFondo = document.getElementById('videoFondo');
    const videoFondoBlur = document.getElementById('videoFondoBlur');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const btnReiniciar = document.getElementById('btnReiniciar');

    if (videoFondo) {
        if (btnPlayPause) {
            videoFondo.pause();
            videoFondo.muted = true;
            if (videoFondoBlur) {
                videoFondoBlur.pause();
                videoFondoBlur.muted = true;
            }

            btnPlayPause.addEventListener('click', () => {
                if (videoFondo.paused) {
                    videoFondo.muted = false;
                    if (videoFondoBlur) videoFondoBlur.muted = false;
                    
                    videoFondo.play();
                    if (videoFondoBlur) videoFondoBlur.play();
                    
                    btnPlayPause.textContent = '❚❚';
                    btnPlayPause.title = "Pausar video";
                } else {
                    videoFondo.pause();
                    if (videoFondoBlur) videoFondoBlur.pause();
                    
                    btnPlayPause.textContent = '►';
                    btnPlayPause.title = "Reproducir video";
                }
            });

            if (btnReiniciar) {
                btnReiniciar.addEventListener('click', () => {
                    videoFondo.currentTime = 0;
                    videoFondo.pause();
                    if (videoFondoBlur) {
                        videoFondoBlur.currentTime = 0;
                        videoFondoBlur.pause();
                    }
                    if (btnPlayPause) {
                        btnPlayPause.textContent = '►';
                        btnPlayPause.title = "Reproducir video";
                    }
                });
            }
        } else {
            videoFondo.muted = true;
            videoFondo.play().catch(() => {});
            if (videoFondoBlur) {
                videoFondoBlur.muted = true;
                videoFondoBlur.play().catch(() => {});
            }
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