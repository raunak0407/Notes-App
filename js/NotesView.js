export default class NotesView{

    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}){
        this.root = root
        this.onNoteSelect = onNoteSelect
        this.onNoteAdd = onNoteAdd
        this.onNoteEdit = onNoteEdit
        this.onNoteDelete = onNoteDelete 

        this.root.innerHTML = `
            <div class="notes-sidebar">
                <button class="notes-add">Add note</button>
                <div class="notes-list">

                </div>
            </div>
            <hr class="divider">
            <div class="notes-preview">
                <input class="notes-title" type="text" placeholder="Enter title here...."/>
                <hr style="width:100%;height:2px;border-width:0;color:#c2c2c2;margin-top:0;background-color:#c2c2c2">
                <textarea class="notes-body">New Note..</textarea>
            </div>
        `

        const btnAdd = this.root.querySelector(".notes-add")
        const inpTitle = this.root.querySelector(".notes-title")
        const inpBody = this.root.querySelector(".notes-body")

        btnAdd.addEventListener("click", ()=>{
            this.onNoteAdd()
        })

        const inputFields = [inpTitle, inpBody]

        inputFields.forEach((inputField)=>{
            inputField.addEventListener("blur", ()=>{
                const updatedTitle = inpTitle.value.trim()
                const updatedBody = inpBody.value.trim()

                this.onNoteEdit(updatedTitle, updatedBody)
            })
        })

        
        this.updateNotePreviewVisibility(false)
        

    }

    _createListItemHTML(id, title, body, updated){
        const MAX_BODY_LENGTH = 30
        return `
            <div class="notes-list-item" data-note-id="${id}">
                        <div class="note-small-title">${title}</div>
                        <div class="note-small-body">
                            ${body.substring(0, MAX_BODY_LENGTH)}
                            ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                        </div>
                        <div class="note-small-updated">
                            ${updated.toLocaleString(undefined, {dateStyle: "full", timeStyle: "short"})}
                        </div>
            </div>
        `
    }

    updateNoteList(notes){
        const notesListContainer = this.root.querySelector(".notes-list")
        notesListContainer.innerHTML = ""

        notes.forEach((note) => {
            // console.log(note.body)
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated))

            notesListContainer.insertAdjacentHTML("beforeend", html)
        })

        notesListContainer.querySelectorAll(".notes-list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", ()=>{
                this.onNoteSelect(noteListItem.dataset.noteId)
            })

            noteListItem.addEventListener("dblclick", ()=>{
                const doDelete = confirm("Are you sure you want to delete this note?")
                if(doDelete){ 
                    this.onNoteDelete(noteListItem.dataset.noteId)
                }
            })
        })
    }

    updateActiveNote(note){
        this.root.querySelector(".notes-title").value = note.title
        this.root.querySelector(".notes-body").value = note.body

        this.root.querySelectorAll(".notes-list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes-list-item-selected")
        })

        this.root.querySelector(`.notes-list-item[data-note-id = "${note.id}"]`).classList.add("notes-list-item-selected")

    }

    updateNotePreviewVisibility(visible){
        this.root.querySelector(".notes-preview").style.visibility = visible ? "visible" : "hidden"
    }

}