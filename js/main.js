import NotesView from "./NotesView.js"
import NotesAPI from "./NotesAPI.js"

const app = document.getElementById('app')

const view = new NotesView(app, {
    onNoteAdd(){
        console.log('New Note added')
    }, 
    
    onNoteEdit(newTitle, newBody){
        // console.log(newTitle)
        // console.log(newBody)

    }
})
// console.log(NotesAPI.getAllNotes())

view.updateNoteList(NotesAPI.getAllNotes())