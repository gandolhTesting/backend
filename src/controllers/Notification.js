const Notifications = require('../models/Notification');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.find(
      {},
      {_id: 0, msg: 1, date: 1, email: 1 }
    );
    res.status(200).json({
      status: 'OK',
      notifications: notifications
    });
  } catch (err) {
    res.status(500).json({
      status: 'ERR',
      message: err.message
    });
  }
};

exports.createNotification = async (req, res) => {
    try {
        const notif = new Notifications({
                msg : req.body.msg,
                date : req.body.date,
                email : req.body.email
        });

        const existing = await Notifications.findOne({
            msg: req.body.msg,
            date: req.body.date,
            email: req.body.email
        }).exec();

        if (existing) {
            res.status(409).json({
                status: 'ERR',
            });
        } else {
            await notif.save();
            res.status(200).json({
                status: 'OK',
                notif
            });
        }
    } catch (err) {
      console.log(err)
        res.status(500).json({
            status: 'ERR',
            message: err.message
        });
    }
};
  
exports.updateNotification = async (req, res) => {
 
};

exports.deleteNotification = async (req, res) => {
 
};