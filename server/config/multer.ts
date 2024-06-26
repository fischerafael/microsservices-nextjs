import multer from "multer";
import fs from "fs";
import path from "path";
import { NextApiRequest } from "next";

class FileLoader {
  private upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadDir = path.join(process.cwd(), "temp");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, "./temp");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
  });

  public config = {
    api: {
      bodyParser: false,
    },
  };

  disableBodyParser = () => {
    return {
      api: {
        bodyParser: false,
      },
    };
  };

  uploadFileTemp = async (req: any, res: any) => {
    await new Promise((resolve, reject) => {
      this.upload.single("file")(req as any, res as any, (err: any) => {
        if (err instanceof multer.MulterError) {
          console.error(err);
          return reject({ status: 400, message: `File upload error: ${err}` });
        }
        if (err) {
          console.error(err);
          return reject({
            status: 500,
            message: `Internal server error: ${err}`,
          });
        }
        resolve("");
      });
    });
  };
}

export const fileLoader = new FileLoader();
export interface NextApiRequestWithFile extends NextApiRequest {
  file: any;
}

// import multer from "multer";
// import { NextApiRequest } from "next";

// class FileLoader {
//   private upload = multer({
//     storage: multer.diskStorage({}),
//     limits: { fileSize: 20 * 1024 * 1024 },
//   });

//   disableBodyParser = () => {
//     return {
//       api: {
//         bodyParser: false,
//       },
//     };
//   };

//   uploadFileTemp = async (req: any, res: any) => {
//     await new Promise((resolve, reject) => {
//       this.upload.single("file")(req as any, res as any, (err: any) => {
//         if (err instanceof multer.MulterError) {
//           console.error(err);
//           return reject({ status: 400, message: "File upload error" });
//         }
//         if (err) {
//           console.error(err);
//           return reject({ status: 500, message: "Internal server error" });
//         }
//         resolve("");
//       });
//     });
//   };
// }

// export const fileLoader = new FileLoader();
// export interface NextApiRequestWithFile extends NextApiRequest {
//   file: {
//     fieldname: string;
//     originalname: string;
//     encoding: string;
//     mimetype: string;
//     destination: string;
//     filename: string;
//     path: string;
//     size: number;
//   };
// }
