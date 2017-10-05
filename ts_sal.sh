#!/bin/sh

source $SAL_HOME/salenv.sh
source $LSST_SDK_INSTALL/setup.env

echo  
mkdir -p $LSST_SDK_INSTALL/lsstsal/lib
sal_version=`grep -i version $SAL_DIR/sal_version.tcl | awk '{print $3}'`

cd $SAL_WORK_DIR
echo "Validating interfaces"
# for subsys in archiver camera catchuparchiver dome domeADB domeAPS domeLouvers domeLWS domeMONCS domeTHCS hexapod m1m3 m2ms MTMount ocs processingcluster rotator scheduler tcs
for subsys in scheduler
do
   salgenerator $subsys validate
   salgenerator $subsys html
done

echo "Generating C++"
# for subsys in archiver camera catchuparchiver dome domeADB domeAPS domeLouvers domeLWS domeMONCS domeTHCS hexapod m1m3 m2ms MTMount ocs processingcluster rotator scheduler tcs
for subsys in scheduler
do
   salgenerator $subsys sal cpp
done

# echo "Generating Java"
# for subsys in archiver camera catchuparchiver dome domeADB domeAPS domeLouvers domeLWS domeMONCS domeTHCS hexapod m1m3 m2ms MTMount ocs processingcluster rotator scheduler tcs
# do
#    salgenerator $subsys sal java
# done

echo "Generating Python"
# for subsys in archiver camera catchuparchiver dome domeADB domeAPS domeLouvers domeLWS domeMONCS domeTHCS hexapod m1m3 m2ms MTMount ocs processingcluster rotator scheduler tcs
for subsys in scheduler
do
   salgenerator $subsys sal python
done