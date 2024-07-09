module.exports = (sequelize, DataTypes) => {
  const Vinyasa = sequelize.define("Vinyasa", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    poses: {
      type: DataTypes.JSONB,
    },
    mudras: {
      type: DataTypes.JSONB,
    },
    pranayamas: {
      type: DataTypes.JSONB,
    },
    aromas: {
      type: DataTypes.JSONB,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Vinyasa;
};
