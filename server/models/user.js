const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
      minLength: 6,
    },
    googleId: String,
    facebookId: String,
    provider: {
      type: String,
      default: "local",
    },
    avatar: {
      type: String,
      // default: "https://secure.gravatar.com/avatar/d87f8b856d7dd0eb753cebc69e84aeb7?s=96&d=mm&r=g",
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAYABgAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t/yo49qO1FABR+VFFAB+VH5UUUAH5Uce1H40fjQAce1H5Uv40n40AHHtRx7UfjS/jQAnaiiigAopa6j4eeGF8R61mdd1nbASSg9GP8ACv4/yBoAn8J/Dm88Qxrc3Dmysm5VyMvIP9kenuf1r0Gy+GegWaANaNct/fmkYk/gCB+ldSqhFCqAFHAA6Cj/AD1oA5e8+Gnh+7QhbQ27f34ZGBH4EkfpXn/iz4b3nh+N7q1c3tkvLEDDxj3Hce4r2j/PWggMCDgg9QaAPmaius+I3hhPD2sCS3ULZ3QLoo6I38S/qD+NclQAtFJ/npRQAUUUtACV7D8IbVYvDk8wHzy3DZPsAAB/P868er1r4PagsukXlmSPMhm8zH+ywA/mp/OgD0Gik/z0ooAWiko/z0oA4r4t2qzeGElI+aGdSD7EEEfqPyrxqvXvi/qCwaFbWgI8yebdj/ZUHP6kV5FQAn+etFLRQAlFHaigArY8J+IpPDOsRXaAvEfkljB+8h6/j3H0rIrR0Lw7feI7ryLKEuR9+RuEQepNAH0Bp2o2+q2cd1ayrNBIMqwP6H0NWP8APWuX8G+CB4VVnN7NPK4+dFO2L/vnufeupoAT/PWoL+/t9MtJLm5lWGCMZZ2NWK5fxl4K/wCEqRWF7NBJH9yNjuiz6lfX3oA8o8XeJJPE+sSXRBSBRshjP8Kj19z1rErS13w7feHLryL2EoT9yReUceoNZtABRRRQAhoopcZNAGv4W8N3HifVEtYfkjHzSy44Rf8AH0Fe7aRo9podjHaWcQjiT82PqT3NZXgXw4vhzQoo3UC7mAknPfJ6L+A4/Ouh/wA9aAD/AD0opf8APWk/z1oAKP8APSj/AD1pf89aAKWr6Pa65YvaXkQkib81PYg9jXhXijw3P4Y1R7Wb54z80UuOHX/H1FfQP+etc9458OL4j0OWNFBu4QZID3yOq/iOPyoA8HooIwaKAE7V0PgLShq/iqyidd0Ubec49l5/ngfjXPGvQ/g3bB9U1G4xzHEqA/7xz/7LQB6xRSUUALRSf56UUALRSUf56UALRSUUAeDePNKGkeKb2JF2xSN5yD2bn+eR+Fc/Xofxktgmp6fcY5khZCf905/9mrzygD//2Q==",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    watchLater: {
      type: Array,
      default: [],
    },
    favorites: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// userSchema.methods.generateHash = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// };

// userSchema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.local.password);
// };

module.exports = mongoose.model("User", userSchema);
