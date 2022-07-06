exports.errorMapper = (error) => {
    if (error.name == 'ValidationError') {
        return Object
            .values(error.errors)
            .map(x => x.properties.message)
            .join(' ');
    } else {
        return error.message;
    }
};