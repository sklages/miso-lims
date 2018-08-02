package uk.ac.bbsrc.tgac.miso.core.data;

public enum QcCorrespondingField {
  CONCENTRATION {

    @Override
    public void updateField(Pool pool, double value, String units) {
      pool.setConcentration(value);
      pool.setConcentrationUnits(ConcentrationUnit.getFromString(units));
    }

    @Override
    public void updateField(Library library, double value, String units) {
      library.setInitialConcentration(value);
      library.setConcentrationUnits(ConcentrationUnit.getFromString(units));
    }

    @Override
    public void updateField(Sample sample, double value, String units) {
      sample.setConcentration(value);
      sample.setConcentrationUnits(ConcentrationUnit.getFromString(units));
    }

  },
  VOLUME {

    @Override
    public void updateField(Pool pool, double value, String units) {
      pool.setVolume(value);
      pool.setVolumeUnits(VolumeUnit.getFromString(units));
    }

    @Override
    public void updateField(Library library, double value, String units) {
      library.setVolume(value);
      library.setVolumeUnits(VolumeUnit.getFromString(units));
    }

    @Override
    public void updateField(Sample sample, double value, String units) {
      sample.setVolume(value);
      sample.setVolumeUnits(VolumeUnit.getFromString(units));
    }

  },
  NONE;

  public void updateField(Pool pool, double value, String units) {
    throw new UnsupportedOperationException("Method not implemented for unspecified field");
  }

  public void updateField(Library library, double value, String units) {
    throw new UnsupportedOperationException("Method not implemented for unspecified field");
  }

  public void updateField(Sample sample, double value, String units) {
    throw new UnsupportedOperationException("Method not implemented for unspecified field");
  }

  public void updateField(Run run, double value, String units) {
    throw new UnsupportedOperationException("Method not implemented for unspecified field");
  }

  public void updateField(SequencerPartitionContainer container, double value, String units) {
    throw new UnsupportedOperationException("Method not implemented for unspecified field");
  }

}

