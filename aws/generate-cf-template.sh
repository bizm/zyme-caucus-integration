#!/bin/bash

AWS_DIR="$(dirname "$(realpath "$0")")"
TEMPLATE_YML="$AWS_DIR/zyme-caucus-vpc-api-ecs.template.yml"
API_PLACEHOLDER_TAG="<OPEN-API-BODY-PLACEHOLDER>"
API_YML="$AWS_DIR/zyme-api.yml"
OUTPUT_YML="$AWS_DIR/zyme-caucus-vpc-api-ecs.yml"

if grep -q "$API_PLACEHOLDER_TAG" "$TEMPLATE_YML"; then
  API_LINE_NUMBER=$(sed -n "\|$API_PLACEHOLDER_TAG|=" "$TEMPLATE_YML")
  awk "NR>=1&&NR<$API_LINE_NUMBER" $TEMPLATE_YML > $OUTPUT_YML
  cat $API_YML | sed 's/^/        /' >> $OUTPUT_YML
  awk "NR>$API_LINE_NUMBER" $TEMPLATE_YML >> $OUTPUT_YML
  echo "CloudFormation template generated successfully" && exit 0
else
  echo "CloudFormation template generation failed" && exit 1
fi
