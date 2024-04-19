import { NextResponse } from 'next/server';

import { getFileBucketUrl } from '../../../../util/helpers/file.helper';

interface Params {
  params: { fileName: string };
}

export async function GET(_: Request, { params }: Params) {
  return NextResponse.redirect(getFileBucketUrl(params.fileName));
}
