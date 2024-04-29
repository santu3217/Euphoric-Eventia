export const setResponse = (data, response) => {
    response.status(200)
        .json(data);
}

// export const setErrorResponse = (err, response) => {
//     console.log(err);
//     return response.status(500)
//         .json({
//             code: "ServiceError",
//             message: "Error occured while procesing your request."
//         });
// }


export const setSuccessResponse = (message, response) => {
    console.log("success");
    response.status(200)
        .json({
            data: message
        });
}

export const setErrorResponse = (error, response) => {
    response.status(400)
        .json({
            data: error.message
        });
}