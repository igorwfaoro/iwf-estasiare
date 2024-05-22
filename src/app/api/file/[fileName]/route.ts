import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../errors/error-handler';
import { getFileBucketUrl } from '../../../../util/helpers/file.helper';

interface Params {
  params: { fileName: string };
}

export const GET = withErrorHandler(async (_: Request, { params }: Params) => {
  return NextResponse.redirect(getFileBucketUrl(params.fileName));
});
