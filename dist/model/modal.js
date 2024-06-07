export class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <!-- Contenu du formulaire pour ajouter une cargaison -->
        </div>
      `;
        document.body.appendChild(this.modal);
        this.closeBtn = this.modal.querySelector('.close');
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.fermerModal());
        }
        window.addEventListener('click', (event) => this.gererClicHorsModal(event));
    }
    ouvrirModal() {
        this.modal.style.display = 'block';
    }
    fermerModal() {
        this.modal.style.display = 'none';
    }
    gererClicHorsModal(event) {
        if (event.target === this.modal) {
            this.fermerModal();
        }
    }
}
