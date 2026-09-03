document.addEventListener("DOMContentLoaded", () => {
    
    // --------------------------------------------------------
    // 1. LÓGICA DE FILTROS MACRO (Servicios, Catálogo, Instalaciones)
    // --------------------------------------------------------
    const btnFiltroMacro = document.querySelectorAll('.btn-filtro-macro');
    const seccionCatalogo = document.getElementById('seccion-catalogo');
    const seccionInstalaciones = document.getElementById('seccion-instalaciones');

    if (btnFiltroMacro.length > 0 && seccionCatalogo && seccionInstalaciones) {
        btnFiltroMacro.forEach(btn => {
            btn.addEventListener('click', () => {
                btnFiltroMacro.forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');

                const target = btn.getAttribute('data-target');

                if (target === 'todo') {
                    seccionCatalogo.style.display = 'block';
                    seccionInstalaciones.style.display = 'block';
                } else if (target === 'catalogo') {
                    seccionCatalogo.style.display = 'block';
                    seccionInstalaciones.style.display = 'none';
                } else if (target === 'instalaciones') {
                    seccionCatalogo.style.display = 'none';
                    seccionInstalaciones.style.display = 'block';
                }
            });
        });
    }

    // --------------------------------------------------------
    // 2. LÓGICA DE FILTROS POR CATEGORÍA (Ataúdes y Urnas)
    // --------------------------------------------------------
    function configurarFiltros(selectorBotones, selectorTarjetas) {
        const botones = document.querySelectorAll(selectorBotones);
        const tarjetas = document.querySelectorAll(selectorTarjetas);

        if(botones.length > 0 && tarjetas.length > 0) {
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

    // --------------------------------------------------------
    // 3. LÓGICA DEL CARRUSEL DE IMÁGENES (Opcional en tarjeta si se usa)
    // --------------------------------------------------------
    const carruseles = document.querySelectorAll('.carrusel-tarjeta');
    
    carruseles.forEach(carrusel => {
        const imgElement = carrusel.querySelector('.carrusel-img');
        if (!imgElement) return;

        const galeriaData = imgElement.getAttribute('data-galeria');
        if (galeriaData) {
            const imagenes = galeriaData.split(',').map(url => url.trim()); 
            
            if (imagenes.length > 1) {
                let indiceActual = 0;

                const btnPrev = document.createElement('button');
                btnPrev.innerHTML = '&#10094;';
                btnPrev.className = 'btn-carrusel prev';

                const btnNext = document.createElement('button');
                btnNext.innerHTML = '&#10095;';
                btnNext.className = 'btn-carrusel next';

                carrusel.appendChild(btnPrev);
                carrusel.appendChild(btnNext);

                btnNext.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    indiceActual = (indiceActual + 1) % imagenes.length;
                    imgElement.src = imagenes[indiceActual];
                });

                btnPrev.addEventListener('click', (e) => {
                    e.stopPropagation();
                    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
                    imgElement.src = imagenes[indiceActual];
                });
            }
        }
    });

    // --------------------------------------------------------
    // 4. LÓGICA DEL LIGHTBOX (ZOOM, ARRASTRE E INDICADORES)
    // --------------------------------------------------------
    const modalLightbox = document.getElementById('modalLightbox');
    const imgAmpliada = document.getElementById('imgAmpliada');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const imagenesParaZoom = document.querySelectorAll('.carrusel-img');
    const modalIndicadores = document.getElementById('modalIndicadores');
    
    // Referencias opcionales si tienes botones de flecha dentro del modal Lightbox
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    if (modalLightbox && imgAmpliada) {
        let escala = 1;
        let posX = 0;
        let posY = 0;
        let arrastrando = false;
        let inicioX = 0;
        let inicioY = 0;
        let downX = 0;
        let downY = 0;
        let isDragging = false;
        
        let galeriaActual = [];
        let indiceActual = 0;

        function actualizarTransformacion() {
            imgAmpliada.style.transform = `translate(${posX}px, ${posY}px) scale(${escala})`;
            if (escala > 1) {
                imgAmpliada.style.cursor = 'grab';
            } else {
                imgAmpliada.style.cursor = 'zoom-in';
            }
        }

        function resetZoom() {
            escala = 1;
            posX = 0;
            posY = 0;
            actualizarTransformacion();
        }

        // Función para actualizar la imagen y redibujar los puntos indicadores
        function actualizarImagenModal() {
            if (galeriaActual.length > 0) {
                imgAmpliada.src = galeriaActual[indiceActual];
                resetZoom();

                // Mostrar u ocultar flechas del modal si existen
                if (modalPrev && modalNext) {
                    if (galeriaActual.length > 1) {
                        modalPrev.style.display = 'block';
                        modalNext.style.display = 'block';
                    } else {
                        modalPrev.style.display = 'none';
                        modalNext.style.display = 'none';
                    }
                }

                // Generar los puntos blancos indicadores
                if (modalIndicadores) {
                    modalIndicadores.innerHTML = ''; // Limpiar puntos anteriores
                    
                    if (galeriaActual.length > 1) {
                        galeriaActual.forEach((_, idx) => {
                            const punto = document.createElement('div');
                            punto.style.width = '10px';
                            punto.style.height = '10px';
                            punto.style.borderRadius = '50%';
                            punto.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
                            
                            if (idx === indiceActual) {
                                punto.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                                punto.style.transform = 'scale(1.2)';
                            } else {
                                punto.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                                punto.style.transform = 'scale(1)';
                            }
                            modalIndicadores.appendChild(punto);
                        });
                    }
                }
            }
        }

        imagenesParaZoom.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault(); 
                const dataGaleria = this.getAttribute('data-galeria');
                
                if (dataGaleria) {
                    galeriaActual = dataGaleria.split(',').map(url => url.trim());
                } else {
                    galeriaActual = [this.src];
                }
                
                indiceActual = 0;
                actualizarImagenModal();
                modalLightbox.style.display = 'flex'; 
            });
        });

        // Eventos para los botones de anterior/siguiente del modal (si los tienes)
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

        // Control de Arrastre
        imgAmpliada.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault(); 
            downX = e.clientX;
            downY = e.clientY;
            inicioX = e.clientX - posX;
            inicioY = e.clientY - posY;
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (e.buttons === 0) {
                arrastrando = false;
                return;
            }
            const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
            if (dist > 5) {
                isDragging = true;
                if (escala > 1) {
                    arrastrando = true;
                    posX = e.clientX - inicioX;
                    posY = e.clientY - inicioY;
                    actualizarTransformacion();
                    imgAmpliada.style.cursor = 'grabbing';
                }
            }
        });

        window.addEventListener('mouseup', () => {
            if (arrastrando) {
                arrastrando = false;
                if (escala > 1) imgAmpliada.style.cursor = 'grab';
            }
        });

        // Zoom con un solo Clic
        imgAmpliada.addEventListener('click', (e) => {
            e.stopPropagation();
            const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
            if (isDragging || dist > 5) return; 

            if (escala === 1) {
                escala = 2.5; 
            } else {
                escala = 1; 
                posX = 0;
                posY = 0;
            }
            actualizarTransformacion();
        });

        // Cerrar modal
        const cerrarModalFunc = () => {
            modalLightbox.style.display = 'none';
            resetZoom();
            if(modalIndicadores) modalIndicadores.innerHTML = '';
        };

        if(cerrarModal) {
            cerrarModal.addEventListener('click', cerrarModalFunc);
        }

        modalLightbox.addEventListener('click', (e) => {
            if (e.target === modalLightbox) {
                cerrarModalFunc();
            }
        });

        // Cerrar modal con la tecla Escape (ESC)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalLightbox.style.display === 'flex') {
                cerrarModalFunc();
            }
        });
    }

    // --------------------------------------------------------
    // CONTROL DE VIDEO DE FONDO Y BOTÓN DE SONIDO
    // --------------------------------------------------------
    const videoFondo = document.getElementById('videoFondo');
    const btnSonido = document.getElementById('btnSonido');

    if (videoFondo && btnSonido) {
        videoFondo.play().catch(e => console.log("Autoplay bloqueado por el navegador:", e));

        btnSonido.addEventListener('click', () => {
            if (videoFondo.muted) {
                videoFondo.muted = false;
                videoFondo.play();
                btnSonido.textContent = '🔇 Silenciar Video';
            } else {
                videoFondo.muted = true;
                btnSonido.textContent = '▶️ Reproducir / Activar Sonido';
            }
        });
    }

    // --------------------------------------------------------
    // COPIAR AL PORTAPAPELES DESDE EL FOOTER
    // --------------------------------------------------------
    document.querySelectorAll('.elemento-copiable').forEach(elemento => {
        elemento.addEventListener('click', () => {
            const textoACopiar = elemento.getAttribute('data-valor');
            
            navigator.clipboard.writeText(textoACopiar).then(() => {
                const aviso = document.createElement('div');
                aviso.textContent = '¡Copiado al portapapeles!';
                aviso.style.position = 'fixed';
                aviso.style.bottom = '20px';
                aviso.style.left = '50%';
                aviso.style.transform = 'translateX(-50%)';
                aviso.style.backgroundColor = '#4CAF50';
                aviso.style.color = 'white';
                aviso.style.padding = '10px 20px';
                aviso.style.borderRadius = '5px';
                aviso.style.zIndex = '10000';
                aviso.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                aviso.style.fontWeight = 'bold';
                
                document.body.appendChild(aviso);

                setTimeout(() => {
                    aviso.remove();
                }, 2000);
            }).catch(err => {
                console.error('Error al intentar copiar: ', err);
            });
        });
    });
});