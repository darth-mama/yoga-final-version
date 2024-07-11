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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Vinyasa.associate = (models) => {
    Vinyasa.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Vinyasa;
};
