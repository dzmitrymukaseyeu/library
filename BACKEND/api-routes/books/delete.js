const responseSender = require('../../helpers/response-sender');

const eventsHandlerPost = (req, res) => {
    const { id, userEmail } = req.query;

    if (
        !id
        || !userEmail
        || Object.keys(req.query).length !== 2
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const rawEventsData = fs.readFileSync('./BACKEND/DB/events.json');
    const rawUsersData = fs.readFileSync('./BACKEND/DB/users.json');
    const events = JSON.parse(rawEventsData);
    const users = JSON.parse(rawUsersData);
    const user = users.find(user => user.email === userEmail);

    if (!user) {
        return responseSender(res, 404, 'User not found!');

    } else if (!user.createdEvents.some(eventId => eventId === id)) {
        return responseSender(res, 403, 'Can\'t delete this event!');
    }

    const filteredEvents = events.filter(event => event.id !== id);
    const remappedUsers = users.map(userToMap => {
        if (userToMap.email === userEmail) {
            userToMap.createdEvents = userToMap.createdEvents.filter(eventId => eventId !== id);
        }

        userToMap.eventsToVisit = userToMap.eventsToVisit.filter(eventId => eventId !== id);

        return userToMap;
    });

    try {
        fs.writeFileSync('./BACKEND/DB/events.json', JSON.stringify(filteredEvents));
        fs.writeFileSync('./BACKEND/DB/users.json', JSON.stringify(remappedUsers));
        responseSender(res, 200, 'Event has been deleted!', { id });

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = eventsHandlerPost;
