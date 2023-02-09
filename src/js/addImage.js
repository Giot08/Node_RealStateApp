import { Dropzone } from "dropzone";

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
console.log(token)

// image is the form element ID
Dropzone.options.image = {
    dictDefaultMessage: 'Drop images to upload here',
    acceptedFiles: ".png,.jpg,.jpeg",
    maxFileSize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: true,
    addRemoveLinks: true,
    dictRemoveFile: "Delete",
    dictMaxFilesExceeded: "Only 1 image",
    headers: {
        'CSRF-Token': token
    },
    paramName: 'image'
}
