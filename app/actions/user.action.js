const _app = () => {
    return {
        index: (req, res, next) => {
            try {
                res.status(200).json({
                    response: true,
                    message: `User successfully retrieve`,
                    data: {
                        coba: 'yeay'
                    }
                })
            } catch (error) {
                return next(error);
            }
        }
    }
}


export const UserAction = _app();