module.exports = (sequelize, DataTypes) => {
  const Gig = sequelize.define("gig", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technologies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Gig;
};
