import { OnInit, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

export class CodelessSizingModel {
    marginWidth: number = 1440
    screenWidth: number;

    init(object: any) {
        this.marginWidth = object.marginWidth
        this.screenWidth = object.screenWidth
    }
}

@Injectable({
  providedIn: 'root'
})
export class CodelessComponentsService {
    /// Service model for property storage
    public model: CodelessSizingModel = new CodelessSizingModel()

    constructor(private router: Router,
                public http: HttpClient) {
        
    }

    ngOnInit() { }
    ngOnDestroy() { }

    route(url) {
        let external = url.includes('://') || url.includes('www.')

        if (external) {
            window.open(url, '_blank');
            return
        }

        this.router.navigate([url]);
    }

    // public getFileType(fileType): string {
    //     console.log("getFileType: " + fileType);

    //     if (fileType.startsWith("video")) {
    //         return "video";
    //     } else if (fileType.startsWith("image/png")) {
    //         return "png";
    //     } else if (fileType.startsWith("image")) {
    //         return "jpg";
    //     }

    //     return "jpg";
    // }

    // public createImageUploadToken(fileType): Observable<any> {
    //     if (fileType == null) {
    //         fileType = "jpg";
    //     }

    //     return this.http.post("/api/v2/media/upload/image", {
    //         format: fileType,
    //         is_shared: false,
    //     });
    // }

    // public uploadImage(options, file): Observable<any> {
    //     const data = new FormData();
    //     data.append("key", options["file"]);
    //     data.append("Content-Type", "application/octet-stream");
    //     data.append("AWSAccessKeyId", options["key"]);
    //     data.append("policy", options["policy"]);
    //     data.append("signature", options["signature"]);
    //     data.append("acl", "private");
    //     data.append("Content-Length", file["size"]);
    //     data.append("file", file);

    //     return this.http.post(
    //         "https://s3.amazonaws.com/" + options.bucket,
    //         data
    //     );
    // }

    // public checkUploadStatus(id): Observable<any> {
    //     return this.http.get("/api/v2/media/upload/" + id);
    // }
}
