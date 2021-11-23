import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PageService } from "@platform-services/page/page.service";
// import { CodelessComponentsService } from "../services/codeless-components";

@Component({
    selector: "codeless-replace-image-button",
    templateUrl: "./codeless-replace-image-button.component.html",
    styleUrls: ["./codeless-replace-image-button.component.css"],
})
export class CodelessReplaceImageButton implements OnInit {
    @Output() didStartUpload = new EventEmitter<any>();
    @Output() didUploadImage = new EventEmitter<any>();

    constructor(public pageService: PageService,
                public http: HttpClient) {}
    ngOnInit() {}

    uploadImage(files: FileList) {
        this.didStartUpload.emit(true);
        
        let file = files.item(0);
        let fileType = this.pageService.getFileType(file.type)

        this.pageService.createImageUploadToken(fileType).subscribe((response) => {
            let applicationGUID = localStorage.getItem('application_guid')
            let options = response['response']

            this.pageService.uploadImage(options, file).subscribe((upload) => {
                this.awaitPendingImageUpload(options['id'])
            })
        });
    }

    awaitPendingImageUpload(id) {
        this.pageService.checkUploadStatus(id).subscribe((response) => {
            let status = response['response'].status

            if (status == "COMPLETE") {
                let preview = response['response'].preview
                this.associateAsset(id, preview.raw)
            } else if (status == "INVALID") {
                alert('The file you attempted to upload was not an acceptable file type.')
            } else {
                setTimeout(() => {
                    this.awaitPendingImageUpload(id)
                }, 1000);
            }
        })
    }

    associateAsset(id, preview) {
        let params = { media_id: id };
        let applicationGUID = localStorage.getItem("application_guid");
        let selectedPageGUID = localStorage.getItem("selected_page_guid");
        let url =
            "/api/v2/application/" +
            applicationGUID +
            "/page/" +
            selectedPageGUID +
            "/images/detail";

        this.http.post(url, params).subscribe((result) => {});
        this.didUploadImage.emit({id: id, preview: preview})
    }
}
